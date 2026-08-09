import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import Product from './models/Product';
import User from './models/User';
import bcrypt from 'bcryptjs';

const products = [
  { title: 'Sample Product 1', description: 'Nice item', price: 19.99, countInStock: 10 },
  { title: 'Sample Product 2', description: 'Another item', price: 29.99, countInStock: 5 }
];

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  const pw = await bcrypt.hash('password', 10);
  await User.deleteMany({});
  await User.create({ name: 'Admin', email: 'admin@example.com', password: pw, role: 'admin' });
  console.log('Seed complete');
  process.exit(0);
}

seed().catch(console.error);
