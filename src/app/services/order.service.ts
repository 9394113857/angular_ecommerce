import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'https://backend-cart-order-service.onrender.com/api/orders';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // -----------------------------
  // GET ALL ORDERS
  // -----------------------------
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // -----------------------------
  // GET SINGLE ORDER
  // -----------------------------
  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${orderId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // -----------------------------
  // CANCEL ORDER
  // -----------------------------
  cancelOrder(orderId: number): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/${orderId}/cancel`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}
