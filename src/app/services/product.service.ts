import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // =====================================
  // 🌱 LOCAL BACKEND (COMMENTED)
  // =====================================
  // private readonly LOCAL_BASE_URL =
  //   'http://127.0.0.1:5002/api/angularProduct';

  // private readonly LOCAL_SELLER_URL =
  //   'http://127.0.0.1:5002/api/v1/products';

  // =====================================
  // 🚀 RAILWAY BACKEND (ACTIVE)
  // =====================================
  private readonly RAILWAY_BASE_URL =
    'https://product-backend-production-8593.up.railway.app/api/angularProduct';

  private readonly RAILWAY_SELLER_URL =
    'https://product-backend-production-8593.up.railway.app/api/v1/products';

  // ✅ ACTIVE URLS
  private readonly baseUrl = this.RAILWAY_BASE_URL;
  private readonly sellerUrl = this.RAILWAY_SELLER_URL;

  constructor(private http: HttpClient) {}

  // =========================
  // 📦 GET ALL PRODUCTS
  // =========================
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get`);
  }

  // =========================
  // 🔍 GET SINGLE PRODUCT
  // =========================
  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/get/${id}`);
  }

  // =========================
  // ➕ ADD PRODUCT (SELLER)
  // =========================
  addProduct(payload: any): Observable<any> {
    return this.http.post(`${this.sellerUrl}/add`, payload);
  }

  // =========================
  // 📦 ADD VARIANT / STOCK
  // =========================
  addVariant(productId: number, payload: any): Observable<any> {
    return this.http.post(
      `${this.sellerUrl}/${productId}/variants`,
      payload
    );
  }
}
