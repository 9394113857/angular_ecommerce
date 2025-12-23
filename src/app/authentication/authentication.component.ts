import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { NgForm } from '@angular/forms';
import { cartType, products, signUp } from 'src/data.type';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  @ViewChild('registerForm') registerForm?: NgForm;
  @ViewChild('loginForm') loginFormRef?: NgForm;

  showLogin: boolean = false;
  loginFailed: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private navigate: Router,
    private cartService: CartServiceService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.authService.notAllowedAuth();
    this.titleService.setTitle('E-Comm | Registration | Authentication');
  }

  // ---------------- REGISTER ----------------
  registerFormhandle(registerForm: NgForm): void {
    const userSignupData: signUp = {
      name: registerForm.value.name,
      email: registerForm.value.email,
      password: registerForm.value.password,
      role_type: 'user'
    };

    this.isLoading = true;

    this.authService.userSignup(userSignupData).subscribe({
      next: () => {
        alert('Registration successful');
        this.navigate.navigate(['/']);
      },
      error: () => alert('Registration failed'),
      complete: () => {
        this.isLoading = false;
        this.registerForm?.reset();
      }
    });
  }

  // ---------------- LOGIN ----------------
  loginFormhandle(loginData: NgForm): void {
    this.isLoading = true;

    this.authService.loginUser(loginData.value).subscribe({
      next: (result: any) => {
        this.loginFormRef?.resetForm();

        localStorage.setItem('token', result.access_token);

        if (result.role === 'seller') {
          localStorage.setItem('sellerLoggedIn', result.userId);
          this.navigate.navigate(['seller-home']);
        } else {
          localStorage.setItem(
            'userLoggedIn',
            JSON.stringify({ id: result.userId })
          );
          this.localCartToRemoteCart();
          this.navigate.navigate(['/']);
        }
      },
      error: () => {
        this.loginFailed = 'Invalid credentials';
        setTimeout(() => (this.loginFailed = ''), 2000);
      },
      complete: () => (this.isLoading = false)
    });
  }

  // ---------------- UI TOGGLES ----------------
  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  // ---------------- CART SYNC ----------------
  localCartToRemoteCart() {
    const data = localStorage.getItem('localCart');
    const user = localStorage.getItem('userLoggedIn');
    const userId = user && JSON.parse(user).id;

    if (!data || !userId) return;

    const cartDataList: products[] = JSON.parse(data);

    cartDataList.forEach((product, index) => {
      const cartData: cartType = {
        ...product,
        productId: product._id,   // guaranteed string
        userId,
        quantity: product.quantity ?? 1   // ✅ FIX (MANDATORY)
      };

      delete cartData.id;

      this.cartService.addToCartService(cartData).subscribe();

      if (cartDataList.length === index + 1) {
        localStorage.removeItem('localCart');
      }
    });

    this.cartService.getCartItems(userId);
  }
}
