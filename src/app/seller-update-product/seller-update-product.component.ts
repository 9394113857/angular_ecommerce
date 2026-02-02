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
  showUpdatSuccesMessage = '';
  isLoading = false;
  isProductUpdated = false;
  loadingText = 'Fetching product...';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private navigateRoute: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Seller-Update-Product');
    const productIdParam = this.route.snapshot.paramMap.get('id');

    if (productIdParam) {
      this.isLoading = true;
      this.productService.getSingleProduct(productIdParam).subscribe(data => {
        this.productData = data;
        this.isLoading = false;
      });
    }
  }

  setLoadingText(): void {
    this.loadingText = this.isProductUpdated
      ? 'Please hold on while updating product...'
      : '';
  }

  updateProductHandle(data: Product) {
    if (!this.productData) return;

    data.id = this.productData.id;

    this.isProductUpdated = true;
    this.setLoadingText();

    this.productService.updateProduct(data).subscribe(() => {
      this.showUpdatSuccesMessage = 'Product updated successfully';
      this.isProductUpdated = false;

      setTimeout(() => {
        this.navigateRoute.navigate(['seller-home']);
      }, 2000);
    });
  }
}
