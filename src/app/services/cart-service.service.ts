import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cartType, products } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartData = new EventEmitter<products[] | []>();

  baseUrl = 'https://backend-cart-order-service.onrender.com/api/cart';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // 🔥 VARIANT-AWARE ADD TO CART
  addToCart(cart: cartType) {
    return this.http.post(
      `${this.baseUrl}/`,
      cart,
      { headers: this.getAuthHeaders() }
    );
  }

  getCart() {
    return this.http.get<cartType[]>(
      `${this.baseUrl}/`,
      { headers: this.getAuthHeaders() }
    );
  }

  removeCartItem(id: number) {
    return this.http.delete(
      `${this.baseUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  checkout(payload: {
    contact: number;
    address: string;
    total_price: number;
  }) {
    return this.http.post(
      'https://backend-cart-order-service.onrender.com/api/checkout/',
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  // (Guest cart untouched for now)
  localAddToCart(product: products) {}
  removeLocalItem(productId: string) {}
}
