import { Component, OnInit, ViewChild } from '@angular/core';
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

  cartData: cartType[] = [];
  totalPrice = 0;
  isLoading = false;

  constructor(
    private cartService: CartServiceService,
    private router: Router,
    private titleService: Title,
    private eventTracker: EventTrackingService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Checkout');
    this.loadCart();
  }

  loadCart() {
    this.isLoading = true;
    this.cartService.getCart().subscribe(data => {
      this.cartData = data;
      this.totalPrice = data.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
      this.isLoading = false;
    });
  }

  submitForm() {
    if (this.checkoutForm.invalid) return;

    this.cartService.checkout({
      contact: this.contact!,
      address: this.deliveryAddress!,
      total_price: this.totalPrice
    }).subscribe(() => {
      alert('Order placed successfully');
      this.router.navigate(['/']);
    });
  }
}
