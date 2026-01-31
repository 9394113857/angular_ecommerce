import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { products } from 'src/data.type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  deleteFonticon = faTrash;
  EditFonticon = faEdit;

  productList: products[] = [];

  showDeleteSuccessMessage: string = '';
  isLoading: boolean = false;
  loadingText: string = 'Please wait while retrieving data...'; // ✅ FIX

  constructor(
    private product: ProductService,
    private route: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Seller Home');
    this.showProduct();
  }

  deleteProductFn(id: number) {
    const isConfirm = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!isConfirm) return;

    this.product.deleteProduct(id.toString()).subscribe(() => {
      this.showDeleteSuccessMessage = `Product deleted successfully (ID: ${id})`;
      this.showProduct();

      setTimeout(() => {
        this.showDeleteSuccessMessage = '';
      }, 3000);
    });
  }

  editFn(id: number) {
    this.route.navigate([`seller-update-product/${id}`]);
  }

  showProduct() {
    this.isLoading = true;

    this.product.getProductList().subscribe(data => {
      this.productList = data;
      this.isLoading = false;
    });
  }
}
