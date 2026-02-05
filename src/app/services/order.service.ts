import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // =====================================
  // 🌱 LOCAL BACKEND (COMMENTED)
  // IMPORTANT: no trailing slash
  // =====================================
  // private readonly LOCAL_BASE_URL =
  //   'http://127.0.0.1:5003/api/orders';

  // =====================================
  // 🚀 RENDER BACKEND (ACTIVE)
  // IMPORTANT: no trailing slash
  // =====================================
  private readonly RENDER_BASE_URL =
    'https://backend-cart-order-service.onrender.com/api/orders';

  // ✅ ACTIVE BASE URL
  private readonly baseUrl = this.RENDER_BASE_URL;

  constructor(private http: HttpClient) {}

  // ==========================
  // 🔐 AUTH HEADERS
  // ==========================
  private headers(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ==========================
  // 📦 GET ALL MY ORDERS
  // ==========================
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.baseUrl,
      { headers: this.headers() }
    );
  }

  // ==========================
  // 🔍 GET SINGLE ORDER DETAILS
  // ==========================
  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${orderId}`,
      { headers: this.headers() }
    );
  }

  // ==========================
  // ❌ CANCEL ORDER
  // ==========================
  cancelOrder(orderId: number): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/${orderId}/cancel`,
      {},
      { headers: this.headers() }
    );
  }
}
