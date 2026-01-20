// ==================================================
// AUTH TYPES
// ==================================================

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

// ==================================================
// PRODUCT TYPES
// ==================================================

export interface productVariant {
  id: number;
  color: string;
  stock: number;
}

export interface products {
  // 🔥 MAKE ID NON-OPTIONAL & FLEXIBLE
  _id: string | number;
  id?: number;

  name: string;
  price: number;
  description?: string;

  image?: string;
  category?: string;

  // 🔥 keep for seller edit page
  color?: string;

  // 🔥 VARIANTS
  variants?: productVariant[];

  quantity?: number;
  productId?: string | number;
}

// ==================================================
// CART TYPES
// ==================================================

export interface cartType {
  id?: number;

  productId: string | number;
  variantId: number;
  color: string;

  userId: number;

  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// ==================================================
// PRICE SUMMARY
// ==================================================

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}
