import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
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
    private titleService: Title
  ) {
    this.titleService.setTitle('E-Comm | Add Product');
  }

  submit(form: any): void {
    // Simple validation check before submitting the form
    if (!form.name || !form.price) {
      alert('Name and price are required');
      return;
    }

    // Start loading animation
    this.isLoading = true;

    // Call the service to add the product
    this.productService.addProduct(form).subscribe({
      next: (res) => {
        // Navigate to the next page to add stock
        this.router.navigate(['/seller-add-stock', res.id]);
      },
      error: () => {
        // Handle error and stop loading animation
        alert('Failed to add product');
        this.isLoading = false;
      }
    });
  }
}
