import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  token = '';
  message = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Read token from URL
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    if (!this.token) {
      this.message = "Invalid reset link";
    }

  }

  submit(form: NgForm) {

    if (form.invalid) return;

    // Clear previous message
    this.message = '';
    this.isLoading = true;

    this.authService
      .resetPassword(this.token, form.value.password)
      .subscribe({

        next: () => {

          this.message = 'Password reset successful. Redirecting to login...';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);

        },

        error: (err) => {

          // Show backend error if available
          if (err.error && err.error.error) {
            this.message = err.error.error;
          } else {
            this.message = 'Reset failed or link expired';
          }

          this.isLoading = false;
        },

        complete: () => {
          this.isLoading = false;
        }

      });

  }

}