import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { CartItem } from 'src/data.type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  isLoading = true;
  isUserLoggedIn = false;

  // price summary
  subtotal = 0;
  deliveryCharge = 100;
  total = 0;

  constructor(
    private cartService: CartServiceService,
    private router: Router,
    private titleService: Title,
    private eventTracking: EventTrackingService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Cart');

    this.isUserLoggedIn = !!localStorage.getItem('userLoggedIn');

    if (!this.isUserLoggedIn) {
      this.isLoading = false;
      return;
    }

    this.loadCart();
  }

  // ==========================
  // LOAD CART
  // ==========================
  loadCart(): void {
    this.isLoading = true;

    this.eventTracking.trackEvent({
  event_type: 'cart_view'
});


    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items || [];
        this.calculateTotals();
        this.cartService.cartChanged.emit(this.cartItems.length);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // ==========================
  // CALCULATE TOTALS
  // ==========================
  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    this.total = this.subtotal + this.deliveryCharge;
  }

  // ==========================
  // CHECKOUT
  // ==========================
  goToCheckout(): void {
    this.eventTracking.trackEvent({
  event_type: 'checkout_started'
});

    this.router.navigate(['/checkout']);
  }
}
