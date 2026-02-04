import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // READ (Angular routes)
  private baseUrl = 'http://127.0.0.1:5002/api/angularProduct';

  // SELLER routes
  private sellerUrl = 'http://127.0.0.1:5002/api/v1/products';

  constructor(private http: HttpClient) {}

  // =========================
  // GET ALL PRODUCTS
  // =========================
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get`);
  }

  // =========================
  // GET SINGLE PRODUCT
  // =========================
  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/get/${id}`);
  }

  // =========================
  // ADD PRODUCT (SELLER)
  // =========================
  addProduct(payload: any): Observable<any> {
    return this.http.post(`${this.sellerUrl}/add`, payload);
  }

  // =========================
  // ADD VARIANT / STOCK
  // =========================
  addVariant(productId: number, payload: any): Observable<any> {
    return this.http.post(
      `${this.sellerUrl}/${productId}/variants`,
      payload
    );
  }
}
