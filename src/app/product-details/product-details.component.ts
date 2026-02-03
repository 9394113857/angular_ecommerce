import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartServiceService } from '../services/cart-service.service';
import { Product } from 'src/data.type';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  isLoading = true;
  isSeller = false;
  quantity = 1;

  selectedVariant = {
    variant_id: 1,
    color: 'Black'
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartServiceService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.isSeller = !!localStorage.getItem('sellerLoggedIn');

    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    if (!productId) {
      this.isLoading = false;
      return;
    }

    this.productService.getSingleProduct(productId.toString()).subscribe({
      next: (data) => {
        this.product = data;
        this.titleService.setTitle(`E-Comm | ${data.name}`);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  increaseQty() { this.quantity++; }
  decreaseQty() { if (this.quantity > 1) this.quantity--; }

  // ==========================
  // ADD TO CART
  // ==========================
  addToCart(): void {
    if (!localStorage.getItem('userLoggedIn')) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart({
      product_id: this.product.id,
      variant_id: this.selectedVariant.variant_id,
      name: this.product.name,
      color: this.selectedVariant.color,
      price: this.product.price,
      quantity: this.quantity
    }).subscribe(() => {
      this.cartService.getCart().subscribe(items => {
        this.cartService.cartChanged.emit(items.length);
      });
    });
  }

  editProduct(): void {
    this.router.navigate([`/seller-update-product/${this.product.id}`]);
  }
}
