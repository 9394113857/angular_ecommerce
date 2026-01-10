import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cartType, products } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  /** Emits cart items to header */
  cartData = new EventEmitter<products[] | []>();

  // =====================================================
  // LOCAL DEVELOPMENT CART SERVICE (COMMENTED)
  // =====================================================
  baseUrl = 'http://127.0.0.1:5003/api/cart';

  // =====================================================
  // PRODUCTION CART SERVICE (RENDER) ✅ ACTIVE
  // =====================================================
  // baseUrl = 'https://backend-cart-order-service.onrender.com/api/cart';

  constructor(private http: HttpClient) {}

  // =====================================================
  // 🔐 JWT HEADER
  // =====================================================
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // =====================================================
  // 🛒 CART (LOGGED-IN USER)
  // =====================================================

  /** ADD ITEM */
  addToCart(cart: cartType) {
    return this.http.post(
      `${this.baseUrl}/`,
      cart,
      { headers: this.getAuthHeaders() }
    );
  }

  /** GET ALL CART ITEMS */
  getCart() {
    return this.http.get<cartType[]>(
      `${this.baseUrl}/`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** REMOVE SINGLE ITEM */
  removeCartItem(id: number) {
    return this.http.delete(
      `${this.baseUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // =====================================================
  // 💳 CHECKOUT
  // =====================================================
  checkout(payload: {
    contact: number;
    address: string;
    total_price: number;
  }) {
    return this.http.post(
      'https://backend-cart-order-service.onrender.com/api/checkout/',
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  // =====================================================
  // 👤 GUEST CART (LOCAL STORAGE)
  // =====================================================
  localAddToCart(product: products) {
    let items: products[] = [];
    const local = localStorage.getItem('localCart');

    if (local) {
      items = JSON.parse(local);
      items.push(product);
    } else {
      items = [product];
    }

    localStorage.setItem('localCart', JSON.stringify(items));
    this.cartData.emit(items);
  }

  removeLocalItem(productId: string) {
    const local = localStorage.getItem('localCart');
    if (!local) return;

    let items: products[] = JSON.parse(local);
    items = items.filter(p => p._id !== productId);

    localStorage.setItem('localCart', JSON.stringify(items));
    this.cartData.emit(items);
  }
}
