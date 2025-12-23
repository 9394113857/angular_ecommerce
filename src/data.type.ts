// ===============================
// AUTH
// ===============================
export interface signUp {
  name: string;
  email: string;
  password: string;
  role_type: string;
}

export interface login {
  email: string;
  password: string;
}

// ===============================
// PRODUCT
// ===============================
export interface products {
  _id: string;          // ✅ REQUIRED (backend Mongo/SQL ID)
  id?: number;          // optional legacy / JSON server
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  quantity?: number;
  productId?: number;
}

// ===============================
// CART
// ===============================
export interface cartType {
  _id?: string;
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  quantity: number;
  id?: number;
  productId: string;   // ✅ REQUIRED
  userId: number;
}

// ===============================
// PRICE SUMMARY
// ===============================
export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}
