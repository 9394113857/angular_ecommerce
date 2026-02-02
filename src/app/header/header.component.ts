import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { Product } from 'src/data.type';

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

  // search results (safe)
  searchResult: Product[] = [];

  constructor(
    private router: Router,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {

    // menu switching
    this.router.events.subscribe(() => {
      if (localStorage.getItem('sellerLoggedIn')) {
        this.menuType = 'seller';
      } else if (localStorage.getItem('userLoggedIn')) {
        this.menuType = 'user';
      } else {
        this.menuType = 'default';
      }
    });

    // cart count (local only for now)
    const localCart = localStorage.getItem('localCart');
    this.cartItems = localCart ? JSON.parse(localCart).length : 0;
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
