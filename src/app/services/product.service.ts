import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/data.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Angular-compatible read routes
  private baseUrl = 'http://127.0.0.1:5002/api/angularProduct';

  // Seller routes (JWT protected)
  private sellerUrl = 'http://127.0.0.1:5002/api/v1/products';

  constructor(private http: HttpClient) {}

  // ===============================
  // GET ALL PRODUCTS (HOME, SEARCH)
  // ===============================
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get`);
  }

  // ===============================
  // GET SINGLE PRODUCT
  // ===============================
  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/get/${id}`);
  }

  // ===============================
  // SEARCH PRODUCTS (FRONTEND ONLY)
  // ===============================
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get`).pipe(
      // frontend filter (backend search later)
      map(products =>
        products.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  // ===============================
  // SELLER: ADD PRODUCT
  // ===============================
  postProduct(data: Product): Observable<any> {
    return this.http.post(`${this.sellerUrl}/add`, data);
  }

  // ===============================
  // SELLER: UPDATE PRODUCT
  // ===============================
  updateProduct(data: Product): Observable<any> {
    return this.http.patch(`${this.sellerUrl}/update`, {
      productId: data.id,
      updatedData: data
    });
  }

  // ===============================
  // SELLER: DELETE PRODUCT
  // ===============================
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.sellerUrl}/delete`, {
      body: { productId: id }
    });
  }
}
