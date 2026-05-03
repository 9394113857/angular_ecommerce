// =========================
// Cell 1: Orders Component (FINAL - ML EVENTS CLEAN ✅)
// =========================

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { Order } from 'src/data.type';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private eventTracking: EventTrackingService
  ) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    this.loadOrders();

    // 🔥 EVENT: ORDERS PAGE VIEW
    this.eventTracking.trackEvent({
      event_type: 'orders_page_view'
    });
  }

  // =========================
  // LOAD ORDERS
  // =========================
  loadOrders(): void {
    this.isLoading = true;

    this.orderService.getMyOrders().subscribe({
      next: (data: any) => {
        this.orders = data || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // =========================
  // VIEW ORDER
  // =========================
  viewOrder(order: Order): void {

    this.router.navigate(['/orders', order.order_id], {
      state: { order }
    });

    // 🔥 EVENT: ORDER VIEW
    this.eventTracking.trackEvent({
      event_type: 'order_view',
      object_id: order.order_id,
      event_metadata: {
        total_items: order.items?.length || 0
      }
    });
  }

  // =========================
  // CANCEL ORDER
  // =========================
  cancelOrder(order: any): void {

    if (!confirm('Are you sure you want to cancel this order?')) return;

    this.orderService.cancelOrder(order.order_id).subscribe({

      next: () => {

        console.log('🔥 Cancel success, sending ML events');

        // 🔥 EVENT: ORDER CANCELLED (PRODUCT LEVEL)
        if (order.items && order.items.length > 0) {

          order.items.forEach((item: any) => {
            this.eventTracking.trackEvent({
              event_type: 'order_cancelled',
              object_id: item.product_id,
              event_metadata: {
                quantity: item.quantity,
                price: item.price
              }
            });
          });

        } else {

          // fallback if items missing
          this.eventTracking.trackEvent({
            event_type: 'order_cancelled',
            object_id: order.order_id,
            event_metadata: {
              fallback: true
            }
          });
        }

        this.loadOrders();
      },

      error: (err) => {
        console.error('Cancel failed', err);
        alert('Cancel failed');
      }
    });
  }
}
