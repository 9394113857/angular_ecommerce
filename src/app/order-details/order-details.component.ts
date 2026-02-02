import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from 'src/data.type';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order!: Order;
  isLoading = false;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.order = nav?.extras?.state?.['order'];

    if (!this.order) {
      // direct refresh protection
      this.router.navigate(['/orders']);
    }
  }

  cancelOrder(): void {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    this.isLoading = true;

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

  goBack(): void {
    this.router.navigate(['/orders']);
  }
}
