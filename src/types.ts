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

export interface Review {
  _id: string;
  customerName: string;
  phone: string;
  product: Product;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

export interface OrderItem {
  item: string;
  quantity: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  _id: string;
  orderId: string;
  customer: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type GeneralCreateResponse<T> = {
  data?: T;
  message?: string;
  error?: string;
};

export interface PaymentInitiationData {
  transactionId: string;
  order: string;
  customerEmail: string;
  customerFullName: string;
  customerPhone: string;
  reference: string;
  amount: number;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
  error: string | null;
}
