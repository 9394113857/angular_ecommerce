// =========================
// Cell 1: Checkout Component (FINAL - ML EVENTS CLEAN ✅)
// =========================

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { CartItem, CheckoutPayload } from 'src/data.type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('checkoutForm') checkoutForm!: NgForm;

  contact!: number;
  address!: string;

  cartItems: CartItem[] = [];
  totalPrice = 0;

  isLoading = false;

  constructor(
    private cartService: CartServiceService,
    private router: Router,
    private titleService: Title,
    private eventTracking: EventTrackingService
  ) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Checkout');
    this.loadCart();
  }

  // =========================
  // LOAD CART
  // =========================
  loadCart(): void {
    this.isLoading = true;

    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items || [];

        this.totalPrice = this.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // =========================
  // PLACE ORDER
  // =========================
  placeOrder(): void {

    if (this.checkoutForm.invalid || this.cartItems.length === 0) return;

    const payload: CheckoutPayload = {
      contact: this.contact,
      address: this.address
    };

    this.isLoading = true;

    this.cartService.checkout(payload).subscribe({

      next: () => {

        // 🔥 EVENT: CHECKOUT COMPLETED (STRONGEST ML SIGNAL)
        this.cartItems.forEach(item => {
          this.eventTracking.trackEvent({
            event_type: 'checkout_completed',
            object_id: item.product_id,
            event_metadata: {
              quantity: item.quantity,
              price: item.price,
              total_order_value: this.totalPrice
            }
          });
        });

        // Reset cart count
        this.cartService.cartChanged.emit(0);

        // Navigate to orders page
        this.router.navigate(['/orders']);
      },

      error: () => {
        alert('Checkout failed. Please try again.');
        this.isLoading = false;
      }
    });
  }
}
