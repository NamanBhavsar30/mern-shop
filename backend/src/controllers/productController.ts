import { Request, Response } from 'express';
import Product from '../models/Product';

export async function listProducts(req: Request, res: Response) {
  const products = await Product.find().limit(50);
  res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
}

export async function createProduct(req: Request, res: Response) {
  const data = req.body;
  const product = new Product(data);
  await product.save();
  res.status(201).json(product);
}
