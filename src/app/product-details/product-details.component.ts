import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartServiceService } from '../services/cart-service.service';
import { products, cartType } from 'src/data.type';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData!: products;

  isLoading: boolean = false;
  loadingText: string = 'Loading product details...';

  isSellerLoggedIn: boolean = false;
  isProductInCart: boolean = false;

  productQuantity: number = 1;
  cartItems: cartType | undefined;

  faEditIcon = faEdit;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartServiceService,
    private router: Router
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
    });
  }

  // ➕➖ QUANTITY
  handleQuantity(type: 'min' | 'plus') {
    if (type === 'min' && this.productQuantity > 1) {
      this.productQuantity--;
    } else if (type === 'plus' && this.productQuantity < 5) {
      this.productQuantity++;
    }
  }

  // 🛒 ADD TO CART
  addToCart() {
    if (!localStorage.getItem('userLoggedIn')) {
      this.cartService.localAddToCart(this.productData);
      this.isProductInCart = true;
      return;
    }

    const user = localStorage.getItem('userLoggedIn');
    const userId = user && JSON.parse(user).id;
    if (!userId) return;

    const cartData: cartType = {
      ...this.productData,
      productId: this.productData._id,
      userId,
      quantity: this.productQuantity
    };

    delete cartData.id;

    this.cartService.addToCartService(cartData).subscribe(() => {
      this.isProductInCart = true;
    });
  }

  // ❌ REMOVE FROM CART
  removeFromCart(id: string) {
    if (!localStorage.getItem('userLoggedIn')) {
      this.cartService.removeItemFromCart(id);
    } else if (this.cartItems?.id !== undefined) {
      this.cartService.cartItemRemoveFromDb(this.cartItems.id).subscribe();
    }
    this.isProductInCart = false;
  }

  // 🔎 CHECK CART
  checkProductInCart() {
    const localCart = localStorage.getItem('localCart');

    if (localCart) {
      const items: products[] = JSON.parse(localCart);
      this.isProductInCart = items.some(
        item => item._id === this.productData._id
      );
    }

    const user = localStorage.getItem('userLoggedIn');
    const userId = user && JSON.parse(user).id;

    if (userId) {
      this.cartService.getCartData(userId).subscribe(result => {
        this.cartItems = result.find(
          item => item.productId === this.productData._id
        );
        this.isProductInCart = !!this.cartItems;
      });
    }
  }

  // ✏️ SELLER EDIT
  EditRedirect(id: number) {
    this.router.navigate([`seller-update-product/${id}`]);
  }
}
