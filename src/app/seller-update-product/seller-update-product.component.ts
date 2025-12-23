import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser'
import { ProductService } from '../services/product.service';
import { products } from 'src/data.type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  // store data
  productData: undefined | products
  showUpdatSuccesMessage: String = ""
  isLoading: boolean = false
  isProductUpdated: boolean = false;
  loadingText: string = 'Fetching product...';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private navigateRoute: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("E-Comm | Seller-Update-Product")
    const productIdParam = this.route.snapshot.paramMap.get("id");
    if (productIdParam !== null) {
      this.isLoading = true
      productIdParam && this.productService.getSingleProduct(productIdParam).subscribe((data) => {
        this.productData = data;
        this.isLoading = false
      });
    }
  }

  // Setter for loadingText
  setLoadingText(): void {
    this.loadingText = this.isProductUpdated ? "Please hold on while updating product..." : '""';
  }

  // update function
  updateProductHandle(data: products) {
    if (this.productData) {
      data._id = this.productData._id
    }
    this.isProductUpdated = true;
    this.setLoadingText();
    // console.log("data which would pass for update", data);

    this.productService.updateProduct(data).subscribe(response => {
      if (response) {
        this.showUpdatSuccesMessage = `Product updated successfully`,
        this.isProductUpdated = false;
        setTimeout(() => {
          this.navigateRoute.navigate(['seller-home'])
        }, 2000)
      }
    })
  }
}
