import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { products } from 'src/data.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: 'default' | 'seller' | 'user' = 'default';
  isMenuOpen: boolean = false;

  cartItems: number = 0;

  sellerName: string = 'Seller';
  userName: string = 'User';

  searchResult: products[] | undefined;

  constructor(
    private route: Router,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {

    // 🔁 MENU SWITCH BASED ON LOGIN STATE
    this.route.events.subscribe(() => {
      if (localStorage.getItem('sellerLoggedIn')) {
        this.menuType = 'seller';
      } else if (localStorage.getItem('userLoggedIn')) {
        this.menuType = 'user';
      } else {
        this.menuType = 'default';
      }
    });

    // 🛒 LOCAL CART (GUEST USER)
    const localCart = localStorage.getItem('localCart');
    if (localCart) {
      this.cartItems = JSON.parse(localCart).length;
    }

    // 🔥 LISTEN TO CART UPDATES (HEADER COUNT FIX)
    this.cartService.cartData.subscribe(items => {
      this.cartItems = items.length;
    });

    // 🔥 SYNC CART ON REFRESH (LOGGED-IN USER)
    const user = localStorage.getItem('userLoggedIn');
    if (user) {
      const userId = JSON.parse(user).id;
      this.cartService.getCartItems(userId);
    }
  }

  // ---------------- SEARCH ----------------
  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.route.navigate([`search/${value}`]);
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  searchbtn(value: string) {
    if (!value) {
      alert('Search input cannot be empty');
      return;
    }
    this.route.navigate([`search/${value}`]);
  }

  // ---------------- MENU ----------------
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // ---------------- NAVIGATION ----------------
  redirectToDetails(id: string) {
    this.route.navigate([`product/details/${id}`]);
  }

  // ---------------- LOGOUT ----------------
  sellerLogout() {
    localStorage.clear();
    this.cartItems = 0;
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.clear();
    this.cartItems = 0;
    this.route.navigate(['/']);
  }
}
