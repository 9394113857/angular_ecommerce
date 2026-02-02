import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: 'default' | 'seller' | 'user' = 'default';
  cartCount = 0;

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

    // initial cart count
    if (localStorage.getItem('userLoggedIn')) {
      this.cartService.getCart().subscribe(items => {
        this.cartCount = items.length;
      });
    }

    // live updates
    this.cartService.cartChanged.subscribe(count => {
      this.cartCount = count;
    });
  }

  logout(): void {
    localStorage.clear();
    this.cartCount = 0;
    this.router.navigate(['/']);
  }
}
