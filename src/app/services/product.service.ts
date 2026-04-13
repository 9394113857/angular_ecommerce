import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // 🚀 RENDER BACKEND (ACTIVE URL)
  //  private readonly RENDER_BASE_URL = 'https://backend-product-service-ncl2.onrender.com/api/angularProduct';

  // 🚀 LOCAL BACKEND (ACTIVE URL)
  private readonly LOCAL_BASE_URL = 'http://127.0.0.1:5002/api/angularProduct';

  // Seller endpoint
  private readonly sellerUrl = `${this.LOCAL_BASE_URL}/v1/products`;

  constructor(private http: HttpClient) {}

  // =========================
  // 📦 GET ALL PRODUCTS
  // =========================
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.LOCAL_BASE_URL}/get`);
  }

  // =========================
  // 🔍 GET SINGLE PRODUCT
  // =========================
  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.LOCAL_BASE_URL}/get/${id}`);
  }

  // =========================
  // ➕ ADD PRODUCT (SELLER)
  // =========================
  addProduct(payload: any): Observable<any> {
    const token = localStorage.getItem('jwt_token');  // Or retrieve token from your auth service
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.sellerUrl}/add`, payload, { headers });
  }

  // =========================
  // 📦 ADD VARIANT / STOCK
  // =========================
  addVariant(productId: number, payload: any): Observable<any> {
    const token = localStorage.getItem('jwt_token');  // Or retrieve token from your auth service
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.sellerUrl}/${productId}/variants`, payload, { headers });
  }
}
