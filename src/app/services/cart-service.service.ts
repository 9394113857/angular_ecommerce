import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cartType, products } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  /**
   * Emits cart items so Header & other components stay in sync
   */
  cartData = new EventEmitter<products[] | []>();

  constructor(private http: HttpClient) {}

  /**
   * CART BACKEND (LOCAL)
   * Flask Cart Service
   */
  baseUrl = 'http://127.0.0.1:5003/cart';

  // =====================================================
  // LOCAL CART (GUEST USER)
  // =====================================================

  localAddToCart(data: products) {
    let cartItems: products[] = [];
    const existing = localStorage.getItem('localCart');

    if (existing) {
      cartItems = JSON.parse(existing);
      cartItems.push(data);
    } else {
      cartItems = [data];
    }

    localStorage.setItem('localCart', JSON.stringify(cartItems));
    this.cartData.emit(cartItems);
  }

  removeItemFromCart(productId: string) {
    const cartData = localStorage.getItem('localCart');
    if (!cartData) return;

    let items: products[] = JSON.parse(cartData);
    items = items.filter(item => item._id !== productId);

    localStorage.setItem('localCart', JSON.stringify(items));
    this.cartData.emit(items);
  }

  // =====================================================
  // BACKEND CART (LOGGED-IN USER)
  // =====================================================

  /**
   * ADD ITEM TO CART
   * POST /api/cart/add
   */
  addToCartService(data: cartType) {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  /**
   * GET CART ITEMS (HEADER COUNT)
   * GET /api/cart/user/<userId>
   */
  getCartItems(userId: number) {
    this.http
      .get<cartType[]>(`${this.baseUrl}/user/${userId}`)
      .subscribe(items => {
        if (items) {
          this.cartData.emit(items);
        }
      });
  }

  /**
   * GET CART ITEMS (CART PAGE)
   * GET /api/cart/user/<userId>
   */
  getCartData(userId: number) {
    return this.http.get<cartType[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * REMOVE SINGLE CART ITEM
   * DELETE /api/cart/item/<cartId>
   */
  cartItemRemoveFromDb(cartId: number) {
    return this.http.delete(`${this.baseUrl}/item/${cartId}`);
  }

  /**
   * CLEAR CART AFTER CHECKOUT
   * POST /api/cart/checkout
   */
  removeAllCartItems(userId: number) {
    return this.http.post(`${this.baseUrl}/checkout`, { userId });
  }
}
