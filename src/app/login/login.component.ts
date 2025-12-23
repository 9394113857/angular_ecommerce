import { Component, ViewChild, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CartServiceService } from '../services/cart-service.service';
import { cartType, products } from 'src/data.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed: string = '';
  isLoading: boolean = false;

  @ViewChild('loginForm') loginFormRef?: NgForm;

  constructor(
    private authService: AuthenticationService,
    private navigate: Router,
    private cartService: CartServiceService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Login');
    this.authService.notAllowedAuth();
  }

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

  redirectToSignup() {
    this.navigate.navigate(['auth']);
  }

  localCartToRemoteCart() {
    const data = localStorage.getItem('localCart');
    const user = localStorage.getItem('userLoggedIn');
    const userId = user && JSON.parse(user).id;

    if (!data || !userId) return;

    const cartDataList: products[] = JSON.parse(data);

    cartDataList.forEach((product, index) => {
      const cartData: cartType = {
        ...product,
        productId: product._id,
        userId,
        quantity: product.quantity ?? 1
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
