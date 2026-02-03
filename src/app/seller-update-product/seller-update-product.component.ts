import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data.type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData?: Product;

  // ✅ REQUIRED by template
  showUpdatSuccesMessage = '';

  isLoading = false;
  isProductUpdated = false;
  loadingText = 'Fetching product...';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Seller Update Product');

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.isLoading = true;

    this.productService.getSingleProduct(id).subscribe(data => {
      this.productData = data;
      this.isLoading = false;
    });
  }

  updateProductHandle(data: Product): void {
    if (!this.productData) return;

    data.id = this.productData.id;
    this.isProductUpdated = true;
    this.loadingText = 'Updating product...';

    this.productService.updateProduct(data).subscribe(() => {
      this.showUpdatSuccesMessage = 'Product updated successfully';
      this.isProductUpdated = false;

      setTimeout(() => {
        this.router.navigate(['/seller-home']);
      }, 1500);
    });
  }
}
