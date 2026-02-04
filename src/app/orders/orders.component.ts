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

  ngOnInit(): void {
    this.loadOrders();
    this.eventTracking.trackEvent({
  event_type: 'orders_page_view'
});

  }

  loadOrders(): void {
    this.isLoading = true;

    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  viewOrder(order: Order): void {
    this.router.navigate(['/orders', order.order_id], {
      state: { order }
    });
    this.eventTracking.trackEvent({
  event_type: 'order_view',
  object_type: 'order',
  object_id: order.order_id.toString()
});

  }
}
