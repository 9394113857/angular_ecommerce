import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from '../services/authentication.service';
import { CartServiceService } from '../services/cart-service.service';
import { cartType, products } from 'src/data.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
redirectToSignup() {
throw new Error('Method not implemented.');
}

  loginFailed = '';
  isLoading = false;

  @ViewChild('loginForm') loginFormRef?: NgForm;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private cartService: CartServiceService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Login');
  }

  loginFormhandle(form: NgForm): void {
    if (form.invalid) return;

    this.isLoading = true;

    this.authService.loginUser(form.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token);

        if (res.role === 'seller') {
          localStorage.setItem('sellerLoggedIn', res.userId);
          this.router.navigate(['/seller-home']);
        } else {
          localStorage.setItem('userLoggedIn', JSON.stringify({ id: res.userId }));
          this.syncLocalCart();
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.loginFailed = 'Invalid credentials';
        this.isLoading = false;
      }
    });
  }

  syncLocalCart() {
    const local = localStorage.getItem('localCart');
    if (!local) return;

    const items: products[] = JSON.parse(local);

    items.forEach(p => {
      const cart: cartType = {
        productId: p.id,
        variantId: 1,
        name: p.name,
        price: p.price,
        quantity: p.quantity ?? 1,
        image: p.image,
        color: p.color
      };
      this.cartService.addToCart(cart).subscribe();
    });

    localStorage.removeItem('localCart');
  }
}
