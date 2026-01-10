import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId!: number;
  order: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (data) => {
        this.order = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  cancelOrder() {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    this.orderService.cancelOrder(this.orderId).subscribe(() => {
      alert('Order cancelled');
      this.loadOrder();
    });
  }
}
