import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItemPayload {
  product_id: number;
  variant_id: number | null;
  quantity: number;
}

export interface CheckoutPayload {
  contact: number;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartChanged = new EventEmitter<number>();

  private readonly BASE_URL =
    'https://backend-cart-order-service-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  // ==============================
  // AUTH HEADERS
  // ==============================
  private headers(): HttpHeaders {
    const token = localStorage.getItem('access_token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // ==============================
  // ADD TO CART (FIXED PAYLOAD)
  // ==============================
  addToCart(productId: number, variantId: number | null, quantity: number): Observable<any> {
    const payload: CartItemPayload = {
      product_id: productId,
      variant_id: variantId,
      quantity: quantity
    };

    return this.http.post(
      `${this.BASE_URL}/cart/`,
      payload,
      { headers: this.headers() }
    );
  }

  // ==============================
  // GET CART
  // ==============================
  getCart(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.BASE_URL}/cart/`,
      { headers: this.headers() }
    );
  }

  // ==============================
  // CHECKOUT
  // ==============================
  checkout(payload: CheckoutPayload): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/checkout/`,
      payload,
      { headers: this.headers() }
    );
  }
}