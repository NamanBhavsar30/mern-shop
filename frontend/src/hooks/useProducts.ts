import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export function useProducts() {
  return useQuery(['products'], async () => {
    const { data } = await api.get('/products');
    return data;
  });
}

export function useProduct(id: string) {
  return useQuery(['product', id], async () => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  });
}
