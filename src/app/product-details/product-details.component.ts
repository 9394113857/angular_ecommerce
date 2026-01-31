import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartServiceService } from '../services/cart-service.service';
import { products } from 'src/data.type';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData!: products;

  isLoading = false;
  loadingText: string = 'Loading product details...'; // ✅ FIX

  isSellerLoggedIn = false;
  isProductInCart = false;
  productQuantity = 1;

  faEditIcon = faEdit;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isSellerLoggedIn = !!localStorage.getItem('sellerLoggedIn');

    this.activeRoute.paramMap.subscribe(params => {
      const productId = params.get('productId');
      if (!productId) return;

      this.isLoading = true;

      this.productService.getSingleProduct(productId).subscribe({
        next: result => {
          this.productData = result;
          this.isLoading = false;
          this.checkProductInCart();
        },
        error: () => {
          this.isLoading = false;
        }
      });
    });
  }

  handleQuantity(type: 'min' | 'plus') {
    if (type === 'min' && this.productQuantity > 1) this.productQuantity--;
    if (type === 'plus' && this.productQuantity < 5) this.productQuantity++;
  }

  addToCart() {
    const cartData = {
      productId: this.productData.id,
      variantId: 1,
      name: this.productData.name,
      color: this.productData.color ?? 'Black',  // ✅ FIX
      price: this.productData.price,
      quantity: this.productQuantity
    };

    this.cartService.addToCart(cartData).subscribe(() => {
      this.isProductInCart = true;
    });
  }

  removeFromCart(id: number) {
    this.cartService.removeCartItem(id).subscribe(() => {
      this.isProductInCart = false;
    });
  }

  checkProductInCart() {
    this.cartService.getCart().subscribe(items => {
      this.isProductInCart = items.some(i => i.productId === this.productData.id);
    });
  }

  EditRedirect(id: number) {
    this.router.navigate([`seller-update-product/${id}`]);
  }
}
