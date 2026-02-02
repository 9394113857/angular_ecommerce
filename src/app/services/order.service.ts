import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // LOCAL
  private baseUrl = 'http://127.0.0.1:5003/api/orders';

  // PROD (later)
  // private baseUrl = 'https://backend-cart-service.onrender.com/api/orders';

  constructor(private http: HttpClient) {}

  // 🔐 JWT headers
  private headers(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ==============================
  // 📄 GET MY ORDERS
  // GET /api/orders/
  // ==============================
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.baseUrl,
      { headers: this.headers() }
    );
  }

  // ==============================
  // ❌ CANCEL ORDER
  // PATCH /api/orders/:id/cancel
  // ==============================
  cancelOrder(orderId: number): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/${orderId}/cancel`,
      {},
      { headers: this.headers() }
    );
  }
}
