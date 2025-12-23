import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { cartType } from 'src/data.type';
import { CartServiceService } from '../services/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('checkoutForm') checkoutForm!: NgForm;

  contact?: number;
  deliveryAddress?: string;

  isLoading: boolean = false;
  totalPrice: number = 0;

  cartData: cartType[] = [];

  constructor(
    private cartService: CartServiceService,
    private route: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Checkout');
    this.loadCartItems();
  }

  // ---------------------------
  // LOAD CART ITEMS
  // ---------------------------
  loadCartItems() {
    const userData = localStorage.getItem('userLoggedIn');

    if (!userData) {
      alert('Please login to access checkout');
      this.route.navigate(['/login']);
      return;
    }

    const userId = JSON.parse(userData).id;
    this.isLoading = true;

    this.cartService.getCartData(userId).subscribe({
      next: (data) => {
        this.cartData = data;
        this.calculateTotalPrice();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.isLoading = false;
      }
    });
  }

  // ---------------------------
  // PRICE CALCULATION
  // ---------------------------
  calculateTotalPrice() {
    let price = 0;
    this.cartData.forEach(item => {
      price += item.price * item.quantity;
    });
    this.totalPrice = price;
  }

  // ---------------------------
  // SUBMIT ORDER (UI ONLY)
  // ---------------------------
  submitForm() {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.isLoading = true;

    // Remove all cart items (simulate order success)
    this.cartData.forEach(item => {
      if (item.id) {
        this.cartService.RemoveAllCartItems(item.id);
      }
    });

    setTimeout(() => {
      alert('Order has been placed successfully');
      this.isLoading = false;
      this.route.navigate(['/']);
    }, 500);
  }
}
