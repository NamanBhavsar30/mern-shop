import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products?.map((p: any) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-medium">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="mt-2">
              <span className="font-bold">${p.price.toFixed(2)}</span>
            </div>
            <Link to={`/products/${p._id}`} className="text-indigo-600 mt-2 inline-block">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
