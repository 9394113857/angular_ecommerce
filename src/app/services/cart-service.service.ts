import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem, CheckoutPayload } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  // 🔔 Used by Header to update cart count
  cartChanged = new EventEmitter<number>();

  // LOCAL
  private baseUrl = 'http://127.0.0.1:5003/api';

  // PROD (later)
  // private baseUrl = 'https://backend-cart-service.onrender.com/api';

  constructor(private http: HttpClient) {}

  // 🔐 JWT headers
  private headers(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ==============================
  // 🛒 ADD TO CART
  // POST /api/cart/
  // ==============================
  addToCart(payload: CartItem): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/cart/`,
      payload,
      { headers: this.headers() }
    );
  }

  // ==============================
  // 📦 GET CART
  // GET /api/cart/
  // ==============================
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(
      `${this.baseUrl}/cart/`,
      { headers: this.headers() }
    );
  }

  // ==============================
  // 💳 CHECKOUT
  // POST /api/checkout/
  // ==============================
  checkout(payload: CheckoutPayload): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/checkout/`,
      payload,
      { headers: this.headers() }
    );
  }
}
