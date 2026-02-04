import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  isLoading = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private titleService: Title,
    private eventTracking: EventTrackingService
  ) {
    this.titleService.setTitle('E-Comm | Add Product');
  }

  submit(form: any): void {
    this.isLoading = true;

    

    

    this.productService.addProduct(form).subscribe({
      next: (res) => {
        this.router.navigate(['/seller-add-stock', res.id]);
      },
      error: () => {
        alert('Failed to add product');
        this.isLoading = false;
      }
    });
  }
}
