import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { products } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  // =====================================================
  // LOCAL DEVELOPMENT PRODUCT SERVICE (COMMENTED)
  // =====================================================
  baseUrl = 'http://127.0.0.1:5002/api/angularProduct';

  // =====================================================
  // PRODUCTION PRODUCT SERVICE (RENDER) ✅ ACTIVE
  // baseUrl = 'https://backend-product-service-1yn3.onrender.com/api/angularProduct';

  // -------------------------------
  // ADD PRODUCT (SELLER)
  // -------------------------------
  postProduct(data: products) {
    return this.http.post<any>(`${this.baseUrl}/add`, data);
  }

  // -------------------------------
  // GET ALL PRODUCTS
  // -------------------------------
  getProductList() {
    return this.http.get<products[]>(`${this.baseUrl}/get`);
  }

  // -------------------------------
  // GET SINGLE PRODUCT
  // -------------------------------
  getSingleProduct(id: string) {
    return this.http.get<products>(`${this.baseUrl}/get/${id}`);
  }

  // -------------------------------
  // UPDATE PRODUCT
  // -------------------------------
  updateProduct(data: products) {
    const productId = data._id;
    const { _id, ...updatedData } = data;

    return this.http.patch<any>(`${this.baseUrl}/update`, {
      productId: productId,
      updatedData: updatedData
    });
  }

  // -------------------------------
  // DELETE PRODUCT
  // -------------------------------
  deleteProduct(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/delete`, {
      body: { productId: id }
    });
  }

  // -------------------------------
  // SEARCH PRODUCTS (OPTIONAL)
  // -------------------------------
  searchProducts(query: string) {
    return this.http.get<products[]>(
      `${this.baseUrl}/search/angular?q=${query}`
    );
  }
}
