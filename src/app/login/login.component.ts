import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from '../services/authentication.service';
import { CartServiceService } from '../services/cart-service.service';
import { CartItem, Product } from 'src/data.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  // =========================
  // LOGIN
  // =========================
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
          localStorage.setItem(
            'userLoggedIn',
            JSON.stringify({ id: res.userId })
          );
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

  // =========================
  // REDIRECT TO SIGNUP  ✅ FIX
  // =========================
  redirectToSignup(): void {
    this.router.navigate(['/auth']);
  }

  // =========================
  // SYNC LOCAL CART  ✅ FIX
  // =========================
  syncLocalCart(): void {
    const local = localStorage.getItem('localCart');
    if (!local) return;

    const items: Product[] = JSON.parse(local);

    items.forEach(p => {
      const cart: CartItem = {
        product_id: p.id,
        variant_id: 1,
        name: p.name,
        price: p.price,
        quantity: 1,                // ✅ Product has NO quantity
        color: p.color ?? 'Black'
      };

      this.cartService.addToCart(cart).subscribe();
    });

    localStorage.removeItem('localCart');
  }
}
