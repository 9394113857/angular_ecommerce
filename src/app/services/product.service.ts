import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/data.type';

@Injectable({
providedIn: 'root'
})
export class ProductService {

// ✅ BASE BACKEND URL
private readonly BASE_URL = 'https://backend-product-service-ncl2.onrender.com';

// ✅ Angular GET APIs
private readonly ANGULAR_BASE_URL = `${this.BASE_URL}/api/angularProduct`;

// ✅ Seller APIs (FIXED)
private readonly SELLER_BASE_URL = `${this.BASE_URL}/api/v1/products`;

constructor(private http: HttpClient) {}

// =========================
// 📦 GET ALL PRODUCTS
// =========================
getProductList(): Observable<Product[]> {
return this.http.get<Product[]>(`${this.ANGULAR_BASE_URL}/get`);
}

// =========================
// 🔍 GET SINGLE PRODUCT
// =========================
getSingleProduct(id: string): Observable<Product> {
return this.http.get<Product>(`${this.ANGULAR_BASE_URL}/get/${id}`);
}

// =========================
// ➕ ADD PRODUCT (FIXED)
// =========================
addProduct(payload: any): Observable<any> {
const token = localStorage.getItem('jwt_token');

```
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {})
});

console.log("✅ CORRECT API:", `${this.SELLER_BASE_URL}/add`);

return this.http.post(
  `${this.SELLER_BASE_URL}/add`,
  payload,
  { headers }
);
```

}

// =========================
// 📦 ADD VARIANT
// =========================
addVariant(productId: number, payload: any): Observable<any> {
const token = localStorage.getItem('jwt_token');

```
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {})
});

return this.http.post(
  `${this.SELLER_BASE_URL}/${productId}/variants`,
  payload,
  { headers }
);
```

}
}
