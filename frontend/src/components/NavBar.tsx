import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">MERN Shop</Link>
        <div className="space-x-4">
          <Link to="/login" className="text-indigo-600">Login</Link>
          <Link to="/register" className="text-indigo-600">Register</Link>
        </div>
      </div>
    </nav>
  );
}
