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

  // product list
  productList: products[] | undefined;

  // UI states
  showDeleteSuccessMessage: string = '';
  isLoading: boolean = false;
  loadingText: string = 'Please wait while retrieving data...';

  constructor(
    private product: ProductService,
    private route: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.showProduct();
    this.titleService.setTitle('E-Comm | Seller-Home');
  }

  // -----------------------------
  // DELETE PRODUCT
  // -----------------------------
  deleteProductFn(id: string) {
    const isConfirm = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (isConfirm) {
      this.product.deleteProduct(id).subscribe(response => {
        if (response) {
          this.showDeleteSuccessMessage = `Product deleted successfully with id : ${id}`;
          this.showProduct();
        }
      });
    }

    setTimeout(() => {
      this.showDeleteSuccessMessage = '';
    }, 4000);
  }

  // -----------------------------
  // EDIT PRODUCT
  // -----------------------------
  editFn(id: string) {
    this.route.navigate([`seller-update-product/${id}`]);
  }

  // -----------------------------
  // LOAD PRODUCTS
  // -----------------------------
  showProduct() {
    this.isLoading = true;
    this.product.getProductList().subscribe(data => {
      this.productList = data;
      this.isLoading = false;
    });
  }
}
