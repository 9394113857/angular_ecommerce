import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CartServiceService } from '../services/cart-service.service';
import { Product } from 'src/data.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: 'default' | 'seller' | 'user' = 'default';
  cartItems = 0;
  searchResult: Product[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    // menu state (default / seller / user)
    this.authService.authState$.subscribe(state => {
      this.menuType = state;
    });

    // cart count
    this.cartService.cartChanged.subscribe(count => {
      this.cartItems = count;
    });
  }

  // ================= SEARCH =================
  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.router.navigate([`/search/${value}`]);
    }
  }

  hideSearch() {
    this.searchResult = [];
  }

  searchbtn(value: string) {
    if (!value) return;
    this.router.navigate([`/search/${value}`]);
  }

  redirectToDetails(id: number) {
    this.router.navigate([`/product/details/${id}`]);
  }

  // ================= NAV =================
  goToOrders() {
    this.router.navigate(['/orders']);
  }

  // ================= LOGOUT =================
  sellerLogout() {
    this.authService.logout();
  }

  userLogout() {
    this.authService.logout();
  }
}
