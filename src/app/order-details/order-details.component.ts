// =========================
// Cell 1: Order Details Component (FINAL - ML EVENTS CLEAN ✅)
// =========================

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private eventTracking: EventTrackingService
  ) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('orderId'));

    if (!orderId) {
      this.router.navigate(['/orders']);
      return;
    }

    this.loadOrder(orderId);
  }

  // =========================
  // LOAD ORDER DETAILS
  // =========================
  loadOrder(orderId: number): void {
    this.isLoading = true;

    // 🔥 EVENT: ORDER DETAILS VIEW
    this.eventTracking.trackEvent({
      event_type: 'order_details_view',
      object_id: orderId,
      event_metadata: {
        source: 'order_details_page'
      }
    });

    this.orderService.getOrderDetails(orderId).subscribe({
      next: (data) => {
        this.order = data;
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['/orders']);
      }
    });
  }

  // =========================
  // CANCEL ORDER
  // =========================
  cancelOrder(): void {

    if (!confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    this.isLoading = true;

    // 🔥 EVENT: ORDER CANCEL ATTEMPT
    this.eventTracking.trackEvent({
      event_type: 'order_cancel_attempt',
      object_id: this.order.order_id,
      event_metadata: {
        status_before: this.order.status
      }
    });

    this.orderService.cancelOrder(this.order.order_id).subscribe({
      next: () => {
        this.order.status = 'cancelled';
        this.isLoading = false;
      },
      error: () => {
        alert('Unable to cancel order');
        this.isLoading = false;
      }
    });
  }

  // =========================
  // BACK TO ORDERS
  // =========================
  goBack(): void {
    this.router.navigate(['/orders']);
  }
}
