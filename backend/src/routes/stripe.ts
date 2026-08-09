import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/stripeController';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
// For webhook we need the raw body. Use route-level middleware to get raw body for Stripe signature verification.
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
