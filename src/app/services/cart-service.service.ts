import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { cartType, products } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  // EventEmitter will help establish a communication channel between components and pass data
  //  or trigger actions from child to parent components
  cartData = new EventEmitter<products[] | []>();
  constructor(
    private http: HttpClient
  ) { }

  // baseUrl = "http://localhost:3000/cartData"
  baseUrl = "https://angula-ecom.onrender.com/cartData"


  // add product to cart in local storgae when not logged In

  localAddToCart(data: products) {
    let cartItems = [];
    let isCartItemExits = localStorage.getItem("localCart");

    if (isCartItemExits) {
      cartItems = JSON.parse(isCartItemExits);
      cartItems.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartItems));
      this.cartData.emit(cartItems);

    } else {
      localStorage.setItem("localCart", JSON.stringify([data]))
      this.cartData.emit([data]);
    }

  }


  // remove local cart item

  removeItemFromCart(productId: String) {
    // console.log("remove cart id",productId);
    
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: products[] = JSON.parse(cartData);
      items = items.filter((item: products) => productId !== item._id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  // post method for add to cart

  addToCartService(data: cartType) {
    return this.http.post(this.baseUrl, data)
  }

  // get method for getting cart items for immediate changes use
  getCartItems(userId: number) {
    return this.http.get<products[]>(`${this.baseUrl}?userId=` + userId, {
      observe: 'response',
    }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);

      }
    });
  }


  // remove cart item from database

  cartItemRemoveFromDb(id: number) {
    return this.http.delete(`${this.baseUrl}/` + id);
  }


  //load cart items when user visit to cart page
  getCartData(userId: number) {
    return this.http.get<cartType[]>(`${this.baseUrl}?userId=${userId}`)
  }

  // remove all cart items after order successfull
  RemoveAllCartItems(cartId: number) {

    return this.http.delete(`${this.baseUrl}/` + cartId).subscribe((result) => {
      if (result) {
        this.cartData.emit([]);
      }
    })
  }
}
