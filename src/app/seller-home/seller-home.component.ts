import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { Product } from 'src/data.type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  // ✅ icons (MATCH TEMPLATE)
  deleteFonticon = faTrash;
  EditFonticon = faEdit;

  // ✅ data
  productList: Product[] = [];

  // ✅ message shown in HTML
  showDeleteSuccessMessage = '';

  // ✅ loading
  isLoading = false;
  loadingText = 'Please wait while retrieving data...';

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

    this.productService.getProductList().subscribe(data => {
      this.productList = data;
      this.isLoading = false;
    });
  }

  deleteProductFn(id: number): void {
    const ok = confirm('Are you sure you want to delete this product?');
    if (!ok) return;

    this.productService.deleteProduct(id.toString()).subscribe(() => {
      this.showDeleteSuccessMessage = `Product deleted successfully (ID: ${id})`;
      this.loadProducts();

      setTimeout(() => {
        this.showDeleteSuccessMessage = '';
      }, 3000);
    });
  }

  editFn(id: number): void {
    this.router.navigate([`/seller-update-product/${id}`]);
  }
}
