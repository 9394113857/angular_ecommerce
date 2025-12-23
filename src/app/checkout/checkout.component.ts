import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Title} from '@angular/platform-browser'
import { cartType } from 'src/data.type';
import { CartServiceService } from '../services/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @ViewChild('checkoutForm') checkoutForm!: NgForm;
  contact: number | undefined;
  deliveryAddress: string | undefined;
  isLoading: boolean = false
  totalPrice: number | undefined;
  cartData: cartType[] | undefined;
  orderMsg: string | undefined;

  constructor(
    private cartService: CartServiceService,
    private route: Router,
    private titleService:Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("E-Comm | Checkout")
    this.loadCartItems()
  }

  submitForm() {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.cartData?.forEach((item) => {
      setTimeout(() => {
        item.id && this.cartService.RemoveAllCartItems(item.id);
        alert("Order has been placed")
        this.route.navigate(['/'])
      }, 500)
    })

  }

  loadCartItems() {
    let userData = localStorage.getItem('userLoggedIn');
    if (userData) {
      let parseData = JSON.parse(userData);
      this.isLoading = true;
      this.cartService.getCartData(parseData.id).subscribe(
        (data) => {
          this.cartData = data;
          this.isLoading = false;
          let price = 0;
          data.forEach((item) => {
            if (item.quantity) {
              price += +item.price * +item.quantity;
            }
          });

          this.totalPrice = price;

        },
        (error) => {
          console.log("Error retrieving cart data:", error);

        }
      );
    } else {
      alert("Please login to access this page")
      this.route.navigate(['/login'])
    }
  }
}