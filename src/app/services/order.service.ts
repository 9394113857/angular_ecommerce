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
  // =====================================
  // private readonly LOCAL_BASE_URL =
  //   'http://127.0.0.1:5003/api/orders';

  // =====================================
  // 🚀 RAILWAY BACKEND (ACTIVE)
  // =====================================
  private readonly RAILWAY_BASE_URL =
    'https://backend-cart-order-service-q6qh.onrender.com/api/orders';

  private readonly baseUrl = this.RAILWAY_BASE_URL;

  constructor(private http: HttpClient) {}

  // ==========================
  // 🔐 AUTH HEADERS (FIXED)
  // ==========================
  private headers(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // ✅ FIX
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
