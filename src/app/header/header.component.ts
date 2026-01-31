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
  isMenuOpen = false;

  cartItems = 0;
  sellerName = 'Seller';
  userName = 'User';

  // ✅ NEVER undefined
  searchResult: products[] = [];

  constructor(
    private router: Router,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {

    this.router.events.subscribe(() => {
      if (localStorage.getItem('sellerLoggedIn')) {
        this.menuType = 'seller';
      } else if (localStorage.getItem('userLoggedIn')) {
        this.menuType = 'user';
      } else {
        this.menuType = 'default';
      }
    });

    const localCart = localStorage.getItem('localCart');
    if (localCart) {
      this.cartItems = JSON.parse(localCart).length;
    }

    this.cartService.cartData.subscribe(items => {
      this.cartItems = items.length;
    });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.router.navigate([`search/${value}`]);
    }
  }

  hideSearch() {
    this.searchResult = [];
  }

  searchbtn(value: string) {
    if (!value) return;
    this.router.navigate([`search/${value}`]);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // ✅ FIX: accept number
  redirectToDetails(id: number) {
    this.router.navigate([`product/details/${id}`]);
  }

  sellerLogout() {
    localStorage.clear();
    this.cartItems = 0;
    this.router.navigate(['/']);
  }

  userLogout() {
    localStorage.clear();
    this.cartItems = 0;
    this.router.navigate(['/']);
  }
}
