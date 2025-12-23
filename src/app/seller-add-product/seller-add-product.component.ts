import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { ProductService } from '../services/product.service';
import { products } from 'src/data.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  isProductAdded: boolean = false;
  loadingText: string = '';

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private navigateRoute: Router
  ) {

  }

  ngOnInit(): void {

    this.titleService.setTitle("E-Comm | Seller-Add-Product")
  }

  addProductHandle(data: products) {
    this.isProductAdded = true;
    this.loadingText = this.isProductAdded ? "Please wait while adding product to the database..." : '""';
    this.productService.postProduct(data).subscribe((result) => {
      if (result) {
        this.isProductAdded = false;
        alert('The product has been successfully added');

        this.navigateRoute.navigate(['seller-home']);
      } else {
        alert("Something went wrong");
      }
    });
  }
}
