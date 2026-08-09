import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { signJwt } from '../utils/jwt';

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();

  const token = signJwt({ userId: user._id, role: user.role });
  res.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role }, token });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signJwt({ userId: user._id, role: user.role });
  res.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role }, token });
}
