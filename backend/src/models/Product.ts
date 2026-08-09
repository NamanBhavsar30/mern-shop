import { Schema, model } from 'mongoose';

export interface IProduct {
  title: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  countInStock?: number;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, default: 0 },
    image: String,
    category: String,
    countInStock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model<IProduct>('Product', productSchema);
