// =========================
// Orders Component (PAGINATION CONNECTED ✅)
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

  // =========================
  // DATA
  // =========================

  orders: Order[] = [];

  currentPage = 1;
  totalPages = 1;

  hasNext = false;
  hasPrev = false;

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

    this.eventTracking.trackEvent({
      event_type: 'orders_page_view'
    });
  }

  // =========================
  // LOAD ORDERS
  // =========================

  loadOrders(): void {
    this.isLoading = true;

    this.orderService.getMyOrders(
      this.currentPage,
      10
    ).subscribe({

      next: (response: any) => {

        this.orders = response.orders || [];

        this.currentPage =
          response.pagination?.page || 1;

        this.totalPages =
          response.pagination?.total_pages || 1;

        this.hasNext =
          response.pagination?.has_next || false;

        this.hasPrev =
          response.pagination?.has_prev || false;

        this.isLoading = false;
      },

      error: (err) => {
        console.error('Failed to load orders', err);
        this.isLoading = false;
      }
    });
  }

  // =========================
  // NEXT PAGE
  // =========================

  nextPage(): void {

    if (!this.hasNext) {
      return;
    }

    this.currentPage++;

    this.loadOrders();
  }

  // =========================
  // PREVIOUS PAGE
  // =========================

  prevPage(): void {

    if (!this.hasPrev) {
      return;
    }

    this.currentPage--;

    this.loadOrders();
  }

// =========================
// FIRST PAGE
// =========================

firstPage(): void {

  if (this.currentPage === 1) {
    return;
  }

  this.currentPage = 1;

  this.loadOrders();
}


// =========================
// LAST PAGE
// =========================

lastPage(): void {

  if (this.currentPage === this.totalPages) {
    return;
  }

  this.currentPage = this.totalPages;

  this.loadOrders();
}

  // =========================
  // VIEW ORDER
  // =========================

  viewOrder(order: Order): void {

    this.router.navigate(
      ['/orders', order.order_id],
      {
        state: { order }
      }
    );

    this.eventTracking.trackEvent({
      event_type: 'order_view',
      object_id: order.order_id,
      event_metadata: {
        order_id: order.order_id
      }
    });
  }

  // =========================
  // CANCEL ORDER
  // =========================

  cancelOrder(order: Order): void {

    const confirmed = confirm(
      'Are you sure you want to cancel this order?'
    );

    if (!confirmed) {
      return;
    }

    this.orderService.cancelOrder(order.order_id).subscribe({

      next: () => {

        this.eventTracking.trackEvent({
          event_type: 'order_cancelled',
          object_id: order.order_id,
          event_metadata: {
            order_id: order.order_id
          }
        });

        this.loadOrders();
      },

      error: (err) => {
        console.error('Cancel failed', err);
        alert('Cancel failed');
      }
    });
  }

  // =========================
  // EXPORT CSV
  // =========================

  exportCsv(): void {

    this.orderService.exportOrdersCsv().subscribe({

      next: (blob: Blob) => {

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = url;
        link.download = 'orders.csv';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      },

      error: (err) => {
        console.error('CSV Export Failed', err);
        alert('CSV export failed');
      }
    });
  }
}