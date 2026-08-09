import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import api from '../api/axios';

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id!);

  async function buyNow() {
    try {
      const { data } = await api.post('/stripe/create-checkout-session', { productId: id, quantity: 1 });
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
      }
    } catch (err: any) {
      console.error(err);
      alert('Checkout error');
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Not found</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <div className="mt-4">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
      </div>
      <div className="mt-4">
        <button onClick={buyNow} className="btn-primary">Buy now</button>
      </div>
    </div>
  );
}
