import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://127.0.0.1:5002/api/angularProduct';

  constructor(private http: HttpClient) {}

  postProduct(data: Product) {
    return this.http.post<any>(`${this.baseUrl}/add`, data);
  }

  getProductList() {
    return this.http.get<Product[]>(`${this.baseUrl}/get`);
  }

  getSingleProduct(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/get/${id}`);
  }

  updateProduct(data: Product) {
    return this.http.patch<any>(`${this.baseUrl}/update`, {
      productId: data.id,
      updatedData: data
    });
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/delete`, {
      body: { productId: id }
    });
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/search/angular?q=${query}`
    );
  }
}
