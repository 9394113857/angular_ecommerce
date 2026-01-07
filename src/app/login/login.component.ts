import { Component, ViewChild, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { CartServiceService } from '../services/cart-service.service';
import { cartType, products } from 'src/data.type';

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
    this.authService.notAllowedAuth();
  }

  // ===============================
  // LOGIN SUBMIT
  // ===============================
  loginFormhandle(loginData: NgForm): void {
    if (loginData.invalid) return;

    this.isLoading = true;

    this.authService.loginUser(loginData.value).subscribe({
      next: (result: any) => {
        this.loginFormRef?.resetForm();

        // JWT
        localStorage.setItem('token', result.access_token);

        // SELLER LOGIN
        if (result.role === 'seller') {
          localStorage.setItem('sellerLoggedIn', result.userId);
          this.router.navigate(['seller-home']);
        }
        // USER LOGIN
        else {
          localStorage.setItem(
            'userLoggedIn',
            JSON.stringify({ id: result.userId })
          );

          // 🔁 MOVE LOCAL CART → BACKEND CART
          this.syncLocalCartToBackend();

          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.loginFailed = 'Invalid email or password';
        setTimeout(() => (this.loginFailed = ''), 2000);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // ===============================
  // LOCAL CART → BACKEND CART
  // ===============================
  syncLocalCartToBackend(): void {
    const localCart = localStorage.getItem('localCart');
    const userData = localStorage.getItem('userLoggedIn');

    if (!localCart || !userData) return;

    const userId = JSON.parse(userData).id;
    const items: products[] = JSON.parse(localCart);

    items.forEach((product, index) => {
      const cartData: cartType = {
        ...product,
        productId: product._id,
        userId,
        quantity: product.quantity ?? 1
      };

      this.cartService.addToCart(cartData).subscribe();

      // Clear local cart after last item
      if (index === items.length - 1) {
        localStorage.removeItem('localCart');
      }
    });
  }

  redirectToSignup(): void {
    this.router.navigate(['auth']);
  }
}
