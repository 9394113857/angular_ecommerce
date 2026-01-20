import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartServiceService } from '../services/cart-service.service';
import { products, cartType } from 'src/data.type';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData!: products;

  // 🔥 VARIANTS
  variants: any[] = [];
  selectedVariantId!: number;
  selectedColor!: string;

  isLoading = false;
  loadingText = 'Loading product details...';
  isSellerLoggedIn = false;
  productQuantity = 1;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartServiceService,
    private router: Router,
    private eventTracker: EventTrackingService
  ) {}

  ngOnInit(): void {
    this.isSellerLoggedIn = !!localStorage.getItem('sellerLoggedIn');

    const productId = this.activeRoute.snapshot.paramMap.get('productId');
    if (!productId) return;

    this.isLoading = true;

    this.productService.getSingleProduct(productId).subscribe((result: products) => {
      this.productData = result;
      this.variants = (result as any).variants || [];

      if (this.variants.length > 0) {
        this.selectedVariantId = this.variants[0].id;
        this.selectedColor = this.variants[0].color;
      }

      this.isLoading = false;

      // 📊 ML EVENT (force string id)
      this.eventTracker.trackEvent({
        event_type: 'view_product',
        object_type: 'product',
        object_id: String(this.productData._id),
        metadata: {
          price: this.productData.price,
          category: this.productData.category
        }
      });
    });
  }

  selectVariant(variant: any) {
    this.selectedVariantId = variant.id;
    this.selectedColor = variant.color;
  }

  handleQuantity(type: 'min' | 'plus') {
    if (type === 'min' && this.productQuantity > 1) this.productQuantity--;
    if (type === 'plus' && this.productQuantity < 5) this.productQuantity++;
  }

  addToCart() {
    if (!this.selectedVariantId || !this.selectedColor) {
      alert('Please select a color');
      return;
    }

    const user = JSON.parse(localStorage.getItem('userLoggedIn')!);

    const cartData: cartType = {
      productId: this.productData._id,
      variantId: this.selectedVariantId,
      color: this.selectedColor,
      name: this.productData.name,
      price: this.productData.price,
      quantity: this.productQuantity,
      image: this.productData.image,
      userId: user.id
    };

    this.cartService.addToCart(cartData).subscribe(() => {
      alert('Added to cart');
    });

    this.eventTracker.trackEvent({
      event_type: 'add_to_cart',
      object_type: 'product',
      object_id: String(this.productData._id),
      metadata: {
        variant_id: this.selectedVariantId,
        color: this.selectedColor,
        quantity: this.productQuantity
      }
    });
  }

  EditRedirect(id: number) {
    this.router.navigate([`seller-update-product/${id}`]);
  }
}
