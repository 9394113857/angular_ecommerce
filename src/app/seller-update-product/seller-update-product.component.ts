// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Title } from '@angular/platform-browser';
// import { ProductService } from '../services/product.service';
// import { Product } from 'src/data.type';

// @Component({
//   selector: 'app-seller-update-product',
//   templateUrl: './seller-update-product.component.html',
//   styleUrls: ['./seller-update-product.component.css']
// })
// export class SellerUpdateProductComponent implements OnInit {

//   productData!: Product;

//   isLoading = false;
//   isUpdating = false;
//   message = '';

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private router: Router,
//     private titleService: Title
//   ) {}

//   ngOnInit(): void {
//     this.titleService.setTitle('E-Comm | Seller Update Product');

//     const id = this.route.snapshot.paramMap.get('id');
//     if (!id) return;

//     this.isLoading = true;

//     this.productService.getSingleProduct(id).subscribe({
//       next: (data) => {
//         this.productData = data;
//         this.isLoading = false;
//       },
//       error: () => {
//         this.isLoading = false;
//         this.router.navigate(['/seller-home']);
//       }
//     });
//   }

//   // ===============================
//   // UPDATE PRODUCT
//   // ===============================
//   updateProduct(): void {
//     this.isUpdating = true;

//     this.productService.updateProduct(this.productData).subscribe({
//       next: () => {
//         this.message = 'Product updated successfully';

//         setTimeout(() => {
//           this.router.navigate(['/seller-home']);
//         }, 1200);
//       },
//       error: () => {
//         this.isUpdating = false;
//         alert('Update failed');
//       }
//     });
//   }
// }
