import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  isProductAdded = false;
  loadingText = '';

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Seller Add Product');
  }

  addProductHandle(data: Product): void {
    this.isProductAdded = true;
    this.loadingText = 'Adding product...';

    this.productService.postProduct(data).subscribe(() => {
      this.isProductAdded = false;
      alert('Product added successfully');
      this.router.navigate(['/seller-home']);
    });
  }
}
