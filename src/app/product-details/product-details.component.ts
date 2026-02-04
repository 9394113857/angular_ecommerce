import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartServiceService } from '../services/cart-service.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { Product, ProductVariant } from 'src/data.type';
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

  selectedVariant!: ProductVariant;
  selectedStock = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartServiceService,
    private router: Router,
    private titleService: Title,
    private eventTracking: EventTrackingService

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

        this.eventTracking.trackEvent({
    event_type: 'view_product',
    object_type: 'product',
    object_id: data.id.toString()
  });

        // default variant
        if (this.product.variants?.length) {
          this.onVariantChange(this.product.variants[0]);
        }

        this.titleService.setTitle(`E-Comm | ${data.name}`);
        this.isLoading = false;
      }, //next
      error: () => (this.isLoading = false)
    });
  }

  // ==========================
  // VARIANT CHANGE
  // ==========================
  onVariantChange(variant: ProductVariant): void {
    this.selectedVariant = variant;
    this.selectedStock = variant.stock;

    if (this.quantity > this.selectedStock) {
      this.quantity = this.selectedStock || 1;
    }
    this.eventTracking.trackEvent({
  event_type: 'variant_selected',
  object_type: 'variant',
  object_id: variant.variant_id.toString(),
  metadata: { color: variant.color }
});

  }// onVariantChange

  // ==========================
  // QUANTITY CONTROLS
  // ==========================
  increaseQty(): void {
    if (this.quantity < this.selectedStock) {
      this.quantity++;
    }
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // ==========================
  // ADD TO CART
  // ==========================
  addToCart(): void {
    if (this.selectedStock === 0) return;

    this.eventTracking.trackEvent({
  event_type: 'add_to_cart',
  object_type: 'product',
  object_id: this.product.id.toString(),
  metadata: {
    variant_id: this.selectedVariant.variant_id,
    quantity: this.quantity
  }
});


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

  // ==========================
  // SELLER
  // ==========================
  editProduct(): void {
    this.router.navigate([`/seller-update-product/${this.product.id}`]);
  }
}
