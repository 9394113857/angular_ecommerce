// ==================================================
// AUTH TYPES
// ==================================================

/**
 * Used during user / seller registration
 * role_type is selected from UI (dropdown)
 */
export interface signUp {
  name: string;
  email: string;
  password: string;

  // Role comes from frontend select
  role_type: 'user' | 'seller';
}

/**
 * Used during login
 */
export interface login {
  email: string;
  password: string;
}

// ==================================================
// PRODUCT TYPES
// ==================================================

/**
 * Product structure used across:
 * - Home
 * - Seller pages
 * - Product details
 * - Search
 */
export interface products {
  // Mongo / backend id
  _id?: string;

  // Legacy / JSON-server id (kept for safety)
  id?: number;

  // Core fields
  name: string;
  price: number;
  description?: string;

  // UI-dependent fields (used in HTML templates)
  image?: string;
  category?: string;
  color?: string;

  // Cart-related helpers
  quantity?: number;
  productId?: string;
}

// ==================================================
// CART TYPES
// ==================================================

/**
 * Cart item structure
 * Used in:
 * - Cart page
 * - Header cart count
 * - Checkout
 */
export interface cartType {
  // Cart row id (DB)
  id?: number;

  // Product reference id
  productId?: string;

  // Logged-in user id
  userId: number;

  // Product snapshot
  name: string;
  price: number;
  quantity: number;

  // Image shown in cart UI
  image?: string;
}

// ==================================================
// PRICE SUMMARY (CHECKOUT)
// ==================================================

/**
 * Used in checkout page for order summary
 */
export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}
