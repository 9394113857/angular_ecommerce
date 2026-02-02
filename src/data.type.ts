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
export interface Product {
  id: number;          // Flask / SQL id
  name: string;
  price: number;

  description?: string;
  category?: string;
  image?: string;
  color?: string;

  // seller-side stock info (optional)
  stock?: number;
}

// ================= CART =================
export interface CartItem {
  cart_item_id?: number;   // returned by backend (GET cart)
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
