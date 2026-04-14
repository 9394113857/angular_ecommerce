// =====================================================
// 🟦 SELLER ADD PRODUCT COMPONENT – FINAL VERSION
// =====================================================

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

  // =====================================================
  // 🚀 SUBMIT FORM
  // =====================================================
  submit(form: any): void {

    console.log("📥 RAW FORM:", form);

    // 🔥 Validation
    if (!form.name || !form.price) {
      alert('Name and price are required');
      return;
    }

    // 🔥 Ensure correct payload structure
    const payload = {
      name: form.name,
      price: Number(form.price), // ensure number
      category: form.category || '',
      description: form.description || '',
      image: form.image || '' // 🔥 aligned with backend
    };

    console.log("📦 FINAL PAYLOAD:", payload);

    this.isLoading = true;

    this.productService.addProduct(payload).subscribe({
      next: (res) => {
        console.log("✅ PRODUCT CREATED:", res);

        // Navigate to add stock page
        this.router.navigate(['/seller-add-stock', res.id]);
      },
      error: (err) => {
        console.error("❌ ADD PRODUCT ERROR:", err);

        alert('Failed to add product');
        this.isLoading = false;
      }
    });
  }
}
