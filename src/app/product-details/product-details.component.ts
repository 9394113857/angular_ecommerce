import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartServiceService } from '../services/cart-service.service';
import { products, cartType } from 'src/data.type';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData!: products;
  isLoading = false;
  loadingText = 'Loading product details...';

  isSellerLoggedIn = false;
  isProductInCart = false;
  productQuantity = 1;

  cartItems: cartType | undefined;
  faEditIcon = faEdit;

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

    this.productService.getSingleProduct(productId).subscribe(result => {
      this.productData = result;
      this.isLoading = false;
      this.checkProductInCart();

      // 📊 VIEW PRODUCT EVENT
      this.eventTracker.trackEvent({
        event_type: 'view_product',
        object_type: 'product',
        object_id: this.productData._id,
        metadata: {
          price: this.productData.price,
          category: this.productData.category
        }
      });
    });
  }

  handleQuantity(type: 'min' | 'plus') {
    if (type === 'min' && this.productQuantity > 1) this.productQuantity--;
    if (type === 'plus' && this.productQuantity < 5) this.productQuantity++;
  }

  addToCart() {
    if (!localStorage.getItem('userLoggedIn')) {
      this.cartService.localAddToCart(this.productData);
      this.isProductInCart = true;
    } else {
      const user = JSON.parse(localStorage.getItem('userLoggedIn')!);
      const cartData: cartType = {
        ...this.productData,
        productId: this.productData._id,
        userId: user.id,
        quantity: this.productQuantity
      };

      this.cartService.addToCartService(cartData).subscribe(() => {
        this.isProductInCart = true;
      });
    }

    // 📊 ADD TO CART EVENT
    this.eventTracker.trackEvent({
      event_type: 'add_to_cart',
      object_type: 'product',
      object_id: this.productData._id,
      metadata: {
        quantity: this.productQuantity,
        price: this.productData.price
      }
    });
  }

  removeFromCart(id: string) {
    this.cartService.removeItemFromCart(id);
    this.isProductInCart = false;

    // 📊 REMOVE FROM CART EVENT
    this.eventTracker.trackEvent({
      event_type: 'remove_from_cart',
      object_type: 'product',
      object_id: id
    });
  }

  checkProductInCart() {
    const localCart = localStorage.getItem('localCart');
    if (localCart) {
      const items: products[] = JSON.parse(localCart);
      this.isProductInCart = items.some(item => item._id === this.productData._id);
    }
  }

  EditRedirect(id: number) {
    this.router.navigate([`seller-update-product/${id}`]);
  }
}
