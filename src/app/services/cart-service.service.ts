import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // ✅ IMPORTANT

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
  // 🔥 BASE URL FROM ENV (AUTO SWITCH)
  // =====================================
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // ==============================
  // 🔐 AUTH HEADERS
  // ==============================
  private headers(): HttpHeaders {
    const token = localStorage.getItem('access_token');
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