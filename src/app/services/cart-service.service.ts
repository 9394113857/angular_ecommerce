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

  // ---------------------------------------------
  // BASE URL
  // ---------------------------------------------

  // ✅ LOCAL (ACTIVE)
  private baseUrl = 'http://127.0.0.1:5003/api';

  // 🚀 RENDER (UNCOMMENT WHEN DEPLOYING)
  // private baseUrl = 'https://backend-cart-service.onrender.com/api';

  // ---------------------------------------------

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ==============================
  // ADD TO CART
  // ==============================
  addToCart(payload: CartItemPayload): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/cart/`,
      payload,
      { headers: this.headers() }
    );
  }

  // ==============================
  // GET CART
  // ==============================
  getCart(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/cart/`,
      { headers: this.headers() }
    );
  }

  // ==============================
  // CHECKOUT
  // ==============================
  checkout(payload: CheckoutPayload): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/checkout/`,
      payload,
      { headers: this.headers() }
    );
  }
}
