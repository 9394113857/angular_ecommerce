import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-seller-add-stock',
  templateUrl: './seller-add-stock.component.html',
  styleUrls: ['./seller-add-stock.component.css']
})
export class SellerAddStockComponent implements OnInit {

  productId!: number;

  color = '';
  stock = 0;
  addedVariants: any[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private titleService: Title,
    private eventTracking: EventTrackingService
  ) {
    this.titleService.setTitle('E-Comm | Add Stock');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/seller-home']);
      return;
    }
    this.productId = Number(id);
  }

  addVariant(): void {
    if (!this.color || this.stock <= 0) {
      alert('Enter valid color and stock');
      return;
    }

    this.isLoading = true;

    this.productService.addVariant(this.productId, {
      color: this.color,
      stock: this.stock
    }).subscribe({
      next: (res) => {
        this.addedVariants.push(res);
        this.color = '';
        this.stock = 0;
        this.isLoading = false;
      },
      error: () => {
        alert('Failed to add stock');
        this.isLoading = false;
      }
    });
  }

  finish(): void {
    this.router.navigate(['/seller-home']);
  }
}
