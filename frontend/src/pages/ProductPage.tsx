import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id!);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Not found</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <div className="mt-4">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
}
