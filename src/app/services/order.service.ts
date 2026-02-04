import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // ---------------------------------------------
  // BASE URL (NO TRAILING SLASH)
  // ---------------------------------------------

  // ✅ LOCAL (ACTIVE)
  private baseUrl = 'http://127.0.0.1:5003/api/orders';

  // 🚀 RENDER (UNCOMMENT WHEN DEPLOYING)
  // private baseUrl = 'https://backend-cart-service.onrender.com/api/orders';

  // ---------------------------------------------

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ==========================
  // GET ALL MY ORDERS
  // ==========================
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.baseUrl,
      { headers: this.headers() }
    );
  }

  // ==========================
  // GET SINGLE ORDER DETAILS
  // ==========================
  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${orderId}`,
      { headers: this.headers() }
    );
  }

  // ==========================
  // CANCEL ORDER
  // ==========================
  cancelOrder(orderId: number): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/${orderId}/cancel`,
      {},
      { headers: this.headers() }
    );
  }
}
