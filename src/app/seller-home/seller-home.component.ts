import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data.type';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: Product[] = [];
  isLoading = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Seller Home');
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;

    this.productService.getProductList().subscribe({
      next: (data) => {
        this.productList = data || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  goToAddProduct(): void {
    this.router.navigate(['/seller-add-product']);
  }
}
