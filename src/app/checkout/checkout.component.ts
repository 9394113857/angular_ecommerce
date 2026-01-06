import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { cartType } from 'src/data.type';
import { CartServiceService } from '../services/cart-service.service';
import { Router } from '@angular/router';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('checkoutForm') checkoutForm!: NgForm;

  contact?: number;
  deliveryAddress?: string;
  totalPrice = 0;
  cartData: cartType[] = [];
  isLoading = false;

  constructor(
    private cartService: CartServiceService,
    private router: Router,
    private titleService: Title,
    private eventTracker: EventTrackingService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Checkout');
    this.loadCartItems();
  }

  loadCartItems() {
    const user = localStorage.getItem('userLoggedIn');
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const userId = JSON.parse(user).id;
    this.cartService.getCartData(userId).subscribe(data => {
      this.cartData = data;
      this.totalPrice = data.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    });
  }

  submitForm() {
    if (this.checkoutForm.invalid) return;

    // 📊 CHECKOUT EVENT
    this.eventTracker.trackEvent({
      event_type: 'checkout',
      metadata: {
        total_price: this.totalPrice,
        items_count: this.cartData.length
      }
    });

    this.cartData.forEach(item => {
      if (item.id) this.cartService.RemoveAllCartItems(item.id);
    });

    setTimeout(() => {
      alert('Order placed successfully');
      this.router.navigate(['/']);
    }, 500);
  }
}
