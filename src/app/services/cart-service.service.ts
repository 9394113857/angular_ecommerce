import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItemPayload {
  product_id: number;
  variant_id: number;
  name: string;
  color: string;
  price: number;
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

  // =====================================
  // 🌱 LOCAL BACKEND (COMMENTED)
  // =====================================
  // private readonly LOCAL_BASE_URL =
  //   'http://127.0.0.1:5003/api';

  // =====================================
  // 🚀 RAILWAY BACKEND (ACTIVE)
  // =====================================
  private readonly RAILWAY_BASE_URL =
    'https://backend-cart-order-service-production.up.railway.app/api';

  private readonly baseUrl = this.RAILWAY_BASE_URL;

  constructor(private http: HttpClient) {}

  // ==============================
  // 🔐 AUTH HEADERS (FIXED)
  // ==============================
  private headers(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // ✅ FIX
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ==============================
  // 🛒 ADD TO CART
  // ==============================
  addToCart(payload: CartItemPayload): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/cart/`,
      payload,
      { headers: this.headers() }
    );
  }

  // ==============================
  // 📦 GET CART
  // ==============================
  getCart(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/cart/`,
      { headers: this.headers() }
    );
  }

  // ==============================
  // 💳 CHECKOUT
  // ==============================
  checkout(payload: CheckoutPayload): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/checkout/`,
      payload,
      { headers: this.headers() }
    );
  }
}
