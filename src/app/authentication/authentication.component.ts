import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { SignUp } from 'src/data.type';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  @ViewChild('registerForm') registerForm?: NgForm;
  @ViewChild('loginForm') loginFormRef?: NgForm;

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

  registerFormhandle(form: NgForm) {
    const payload: SignUp = {
      email: form.value.email,
      password: form.value.password,
      role_type: form.value.role_type
    };

    this.isLoading = true;

    this.eventTracking.trackEvent({
  event_type: 'signup_success',
  metadata: { role: payload.role_type }
});


    this.authService.userSignup(payload).subscribe({
      
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: () => alert('Registration failed'),
      complete: () => {
        this.isLoading = false;
        this.registerForm?.reset();
      }
    });
  }

  loginFormhandle(form: NgForm) {
    this.isLoading = true;

    this.authService.loginUser(form.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token);

        if (res.role === 'seller') {
          localStorage.setItem('sellerLoggedIn', res.userId);
          this.router.navigate(['seller-home']);
        } else {
          localStorage.setItem(
            'userLoggedIn',
            JSON.stringify({ id: res.userId })
          );
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.loginFailed = 'Invalid credentials';
        setTimeout(() => (this.loginFailed = ''), 2000);
      },
      complete: () => (this.isLoading = false)
    });
  }

  openLogin() { this.showLogin = true; }
  openSignUp() { this.showLogin = false; }
}
