import { Request, Response } from 'express';
import Stripe from 'stripe';
import Product from '../models/Product';

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' as any });

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const { productId, quantity = 1 } = req.body;
    // Simple flow: look up product and create a Checkout Session
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: product.title, description: product.description || '' },
            unit_amount: Math.round((product.price || 0) * 100)
          },
          quantity: quantity
        }
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/?checkout=success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/?checkout=cancel`
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Stripe error' });
  }
}

export async function handleWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string | undefined;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  try {
    const rawBody = (req as any).rawBody || req.body;
    const event = webhookSecret
      ? stripe.webhooks.constructEvent(rawBody, sig || '', webhookSecret)
      : rawBody;

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        // TODO: fulfill the purchase, create order, send email, etc.
        console.log('Checkout.session.completed', event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
