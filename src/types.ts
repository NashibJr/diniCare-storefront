export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  slung: string;
  totalProducts: number;
}

export type GeneralQuery<T> = {
  page: number;
  pages: number;
  total: number;
  data: T[];
};

export interface Product {
  _id: string;
  name: string;
  images: string[];
  category: Category;
  price: number;
  status: string;
  sku: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  description: string;
}
