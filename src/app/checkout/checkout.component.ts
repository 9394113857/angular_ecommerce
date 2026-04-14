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

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Checkout');
    this.loadCart();
  }

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

  placeOrder(): void {

    if (this.checkoutForm.invalid || this.cartItems.length === 0) return;

    const payload: CheckoutPayload = {
      contact: this.contact,
      address: this.address
    };

    this.isLoading = true;

    this.cartService.checkout(payload).subscribe({

      next: () => {

        // 🔥 ML EVENT TRACKING (FIXED)
        this.cartItems.forEach(item => {
          this.eventTracking.trackEvent({
            event_type: 'checkout',
            object_id: item.product_id,  // ✅ FIX HERE
            event_metadata: {
              quantity: item.quantity,
              price: item.price
            }
          });
        });

        this.cartService.cartChanged.emit(0);
        this.router.navigate(['/orders']);
      },

      error: () => {
        alert('Checkout failed. Please try again.');
        this.isLoading = false;
      }
    });
  }
}
