import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

import { CartServiceService } from '../services/cart-service.service';

import { EventTrackingService } from '../services/event-tracking.service';

import { Product } from 'src/data.type';

import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginFailed = '';

  isLoading = false;


  constructor(

    private authService: AuthenticationService,

    private router: Router,

    private cartService: CartServiceService,

    private titleService: Title,

    private eventTracking: EventTrackingService

  ) {}


  ngOnInit(): void {

    this.titleService.setTitle(
      'E-Comm | Login'
    );

  }

  showPassword = false;

togglePassword(): void {

  this.showPassword = !this.showPassword;

}


  // ============================
  // REDIRECT TO SIGNUP
  // ============================

  redirectToSignup(): void {

    this.router.navigate([
      '/auth'
    ]);

  }


  // ============================
  // LOGIN
  // ============================

  loginFormhandle(form: NgForm): void {

    if (form.invalid) return;

    this.isLoading = true;

    this.authService
      .loginUser(form.value)
      .subscribe({

        next: (res: any) => {

          // =====================================================
          // TOKEN
          // =====================================================

          localStorage.setItem(
            'token',
            res.access_token
          );

          // =====================================================
          // TRACK EVENT
          // =====================================================

          this.eventTracking.trackEvent({

            event_type: 'login_success',

            metadata: {
              role: res.role
            }

          });


          // =====================================================
          // SELLER LOGIN
          // =====================================================

          if (res.role === 'seller') {

            localStorage.setItem(

              'sellerLoggedIn',

              res.userId

            );

            // =====================================================
            // SELLER DATA
            // =====================================================

            localStorage.setItem(

              'seller',

              JSON.stringify({

                id: res.userId,

                role: res.role,

                name: form.value.email,

                email: form.value.email,

                first_name: 'Seller',

                last_name: '',

                is_verified: true

              })

            );

            this.authService.setAuthState(
              'seller'
            );

            this.router.navigate([
              '/seller-home'
            ]);

          }


          // =====================================================
          // USER LOGIN
          // =====================================================

          else {

            localStorage.setItem(

              'userLoggedIn',

              JSON.stringify({
                id: res.userId
              })

            );

            this.authService.setAuthState(
              'user'
            );

            this.syncLocalCart();

            this.router.navigate([
              '/'
            ]);

          }

          this.isLoading = false;

        },


        // =====================================================
        // ERROR
        // =====================================================

        error: (err) => {

          this.eventTracking.trackEvent({

            event_type: 'login_failed'

          });

          if (err.status === 403) {

            this.loginFailed =
              'Please verify your email before login';

          }

          else {

            this.loginFailed =
              'Invalid credentials';

          }

          setTimeout(() => (

            this.loginFailed = ''

          ), 3000);

          this.isLoading = false;

        }

      });

  }


  // ============================
  // SYNC LOCAL CART
  // ============================

  syncLocalCart(): void {

    const local =
      localStorage.getItem(
        'localCart'
      );

    if (!local) return;

    const items: Product[] =
      JSON.parse(local);

    items.forEach(p => {

      this.cartService.addToCart({

        product_id: p.id,

        variant_id: 1,

        name: p.name,

        color: 'Black',

        price: p.price,

        quantity: 1

      }).subscribe();

    });

    localStorage.removeItem(
      'localCart'
    );

  }

}