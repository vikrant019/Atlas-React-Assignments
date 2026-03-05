export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

export const products: Product[] = [
  { id: 1, name: 'Apple', price: 1.5 },
  { id: 2, name: 'Banana', price: 1.0 },
  { id: 3, name: 'Orange', price: 2.0 },
];
