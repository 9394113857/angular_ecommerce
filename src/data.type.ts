// ================= AUTH =================
export interface SignUp {
  email: string;
  password: string;
  role_type: 'user' | 'seller';
}

export interface Login {
  email: string;
  password: string;
}

// ================= PRODUCTS =================
export interface ProductVariant {
  variant_id: number;
  color: string;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  image?: string;
  description?: string;
  variants: ProductVariant[];
}

// ================= CART =================
export interface CartItem {
  cart_item_id?: number;
  product_id: number;
  variant_id: number;
  name: string;
  color: string;
  price: number;
  quantity: number;
}

// ================= CHECKOUT =================
export interface CheckoutPayload {
  contact: number;
  address: string;
}

// ================= ORDERS =================
export interface Order {
  order_id: number;
  status: 'placed' | 'cancelled';
  total_price: number;
  created_at: string;
}
