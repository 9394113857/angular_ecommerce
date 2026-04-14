// =====================================================
// 🟦 PRODUCT SERVICE – FINAL CLEAN VERSION
// =====================================================

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // =====================================================
  // 🟦 BASE BACKEND URL (RENDER)
  // =====================================================
  private readonly BASE_URL = 'https://backend-product-service-ncl2.onrender.com';

  // =====================================================
  // 🟩 ANGULAR READ APIs (PUBLIC)
  // =====================================================
  private readonly ANGULAR_BASE_URL = `${this.BASE_URL}/api/angularProduct`;

  // =====================================================
  // 🟨 SELLER APIs (SECURED)
  // =====================================================
  private readonly SELLER_BASE_URL = `${this.BASE_URL}/api/v1/products`;

  constructor(private http: HttpClient) {}

  // =====================================================
  // 📦 GET ALL PRODUCTS
  // =====================================================
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.ANGULAR_BASE_URL}/get`);
  }

  // =====================================================
  // 🔍 GET SINGLE PRODUCT
  // =====================================================
  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.ANGULAR_BASE_URL}/get/${id}`);
  }

  // =====================================================
  // 🔐 COMMON HEADER BUILDER
  // =====================================================
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');

    console.log("🔑 JWT TOKEN:", token);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  // =====================================================
  // ➕ ADD PRODUCT (FIXED + SAFE)
  // =====================================================
  addProduct(payload: any): Observable<any> {

    // 🔥 FIX: Ensure backend-compatible payload
    const fixedPayload = {
      name: payload.name,
      price: payload.price,
      description: payload.description,
      category: payload.category,

      // ✅ Handle both formats
      image: payload.image || payload.image_url || ''
    };

    console.log("🚀 API:", `${this.SELLER_BASE_URL}/add`);
    console.log("📦 PAYLOAD:", fixedPayload);

    return this.http.post(
      `${this.SELLER_BASE_URL}/add`,
      fixedPayload,
      { headers: this.getAuthHeaders() }
    );
  }

  // =====================================================
  // 📦 ADD VARIANT
  // =====================================================
  addVariant(productId: number, payload: any): Observable<any> {

    const fixedPayload = {
      color: payload.color,
      stock: payload.stock
    };

    console.log("🚀 ADD VARIANT:", `${this.SELLER_BASE_URL}/${productId}/variants`);
    console.log("📦 VARIANT PAYLOAD:", fixedPayload);

    return this.http.post(
      `${this.SELLER_BASE_URL}/${productId}/variants`,
      fixedPayload,
      { headers: this.getAuthHeaders() }
    );
  }
}
