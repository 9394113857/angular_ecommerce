import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser'
import { cartType, priceSummary } from 'src/data.type';
import { CartServiceService } from '../services/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartData: cartType[] | undefined
  isLoggedIn: boolean = false
  priceSummary: priceSummary = {
    price: 0,
    tax: 10,
    delivery: 10,
    discount: 10,
    total: 0
  }

  loading: boolean = true;
  loadingText: string = 'Loading cart items...';


  constructor(
    private cartService: CartServiceService,
    private router:Router,
    private titleService:Title

  ) { }




  ngOnInit(): void {
    this.loadCartItems();
    this.titleService.setTitle("E-Comm | Cart")
  }



  removeFromCart(id: number) {

    this.cartData && this.cartService.cartItemRemoveFromDb(id)
      .subscribe((result) => {
        if (result) {
          let user = localStorage.getItem('userLoggedIn');
          let userId = user && JSON.parse(user).id;
          this.cartService.getCartItems(userId)
          alert("Product removed from cart")
          this.loadCartItems()
        } else {
          alert("Something went wrong")
        }
      })
  }

  loadCartItems() {
    let userData = localStorage.getItem('userLoggedIn');
    if (userData) {
      let parseData = JSON.parse(userData);
      this.isLoggedIn = false;
      this.loading = true;
      this.cartService.getCartData(parseData.id).subscribe(
        (data) => {
          // console.log("data", data);
          this.cartData = data;
          this.loading = false;
  
          let price = 0;
          data.forEach((item) => {
            if (item.quantity) {
              price += +item.price * +item.quantity;
            }
          });
  
          this.priceSummary.price = price;
          this.priceSummary.delivery = 100;
          const discountPercent = 10;
          const discount = price * (discountPercent / 100);
          const total = price + 100 - discount;
          this.priceSummary.total = Number(total.toFixed(2));
        },
        (error) => {
          console.log("Error retrieving cart data:", error);
         
        }
      );
    } else {
      this.isLoggedIn = true;
      this.loading = false;
    }
  }
  


  checkout() {
   this.router.navigate(['/checkout'])
  }
}
