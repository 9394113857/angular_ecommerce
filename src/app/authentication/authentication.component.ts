import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';

import {
  AuthenticationService
} from '../services/authentication.service';

import {
  EventTrackingService
} from '../services/event-tracking.service';

import {
  SignUp
} from 'src/data.type';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent
implements OnInit {

  @ViewChild('registerForm')
  registerForm?: NgForm;

  showLogin = false;

  loginFailed = '';

  isLoading = false;


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private eventTracking: EventTrackingService
  ) {}


  ngOnInit(): void {

    this.authService.notAllowedAuth();
  }


  // =====================================================
  // REGISTER
  // =====================================================

  registerFormhandle(form: NgForm): void {

    const payload: SignUp = {

      first_name: form.value.first_name,

      last_name: form.value.last_name,

      email: form.value.email,

      password: form.value.password,

      role_type: form.value.role_type
    };

    this.isLoading = true;

    this.authService.userSignup(payload)
      .subscribe({

        next: () => {

          this.eventTracking.trackEvent({

            event_type: 'signup_success',

            metadata: {
              role: payload.role_type
            }
          });

          alert(
            'Registration successful. Please verify your email before login.'
          );

          this.router.navigate(['/login']);
        },

        error: (err: any) => {

          if (err.status === 409) {

            alert('Email already exists');

          } else {

            alert('Registration failed');
          }
        },

        complete: () => {

          this.isLoading = false;

          this.registerForm?.reset();
        }

      });
  }


  // =====================================================
  // LOGIN
  // =====================================================

  loginFormhandle(form: NgForm): void {

    this.isLoading = true;

    this.authService.loginUser(form.value)
      .subscribe({

        next: (res: any) => {

          localStorage.setItem(
            'token',
            res.access_token
          );

          if (res.role === 'seller') {

            localStorage.setItem(
              'sellerLoggedIn',
              res.userId
            );

            this.authService.setAuthState(
              'seller'
            );

            this.router.navigate([
              '/seller-home'
            ]);

          } else {

            localStorage.setItem(
              'userLoggedIn',

              JSON.stringify({
                id: res.userId
              })
            );

            this.authService.setAuthState(
              'user'
            );

            this.router.navigate(['/']);
          }

          this.isLoading = false;
        },

        error: (err: any) => {

          if (err.status === 403) {

            this.loginFailed =
              'Please verify your email before login';

          } else {

            this.loginFailed =
              'Invalid email or password';
          }

          this.isLoading = false;
        }

      });
  }


  // =====================================================
  // TOGGLE LOGIN
  // =====================================================

  openLogin(): void {

    this.showLogin = true;
  }


  // =====================================================
  // TOGGLE SIGNUP
  // =====================================================

  openSignUp(): void {

    this.showLogin = false;
  }

}