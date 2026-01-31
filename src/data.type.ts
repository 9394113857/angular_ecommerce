// ================= AUTH =================
export interface signUp {
  name: string;
  email: string;
  password: string;
  role_type: 'user' | 'seller';
}

export interface login {
  email: string;
  password: string;
}

// ================= PRODUCTS =================
export interface products {
  id: number;          // ✅ backend id
  _id?: number;        // legacy support (read-only)

  name: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  color?: string;

  quantity?: number;
}

// ================= CART =================
export interface cartType {
  id?: number;         // cart row id
  productId: number;
  variantId: number;

  name: string;
  price: number;
  quantity: number;

  image?: string;
  color?: string;
  userId?: number;
}

// ================= PRICE SUMMARY =================
export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}
