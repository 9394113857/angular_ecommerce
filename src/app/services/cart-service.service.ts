import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cartType, products } from 'src/data.type';

@Injectable({ providedIn: 'root' })
export class CartServiceService {
  [x: string]: any;

  cartData = new EventEmitter<products[]>();

  baseUrl = 'http://127.0.0.1:5003/api/cart';

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  addToCart(cart: cartType) {
    return this.http.post(`${this.baseUrl}/`, cart, this.headers());
  }

  getCart() {
    return this.http.get<cartType[]>(`${this.baseUrl}/`, this.headers());
  }

  removeCartItem(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.headers());
  }
}
