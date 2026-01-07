import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { cartType, priceSummary } from 'src/data.type';
import { CartServiceService } from '../services/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: cartType[] = [];
  isLoggedIn = false;

  priceSummary: priceSummary = {
    price: 0,
    tax: 10,
    delivery: 100,
    discount: 10,
    total: 0
  };

  loading = true;
  loadingText = 'Loading cart items...';

  constructor(
    private cartService: CartServiceService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Cart');
    this.loadCartItems();
  }

  loadCartItems() {
    if (!localStorage.getItem('userLoggedIn')) {
      this.isLoggedIn = true;
      this.loading = false;
      return;
    }

    this.cartService.getCart().subscribe(data => {
      this.cartData = data;
      this.calculateSummary(data);
      this.loading = false;
    });
  }

  calculateSummary(data: cartType[]) {
    const price = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = price * (this.priceSummary.discount / 100);
    this.priceSummary.price = price;
    this.priceSummary.total = price + this.priceSummary.delivery - discount;
  }

  removeFromCart(id: number) {
    this.cartService.removeCartItem(id).subscribe(() => {
      this.loadCartItems();
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
