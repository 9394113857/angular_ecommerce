import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  message = '';
  isLoading = false;

  constructor(private authService: AuthenticationService) {}

  submit(form: NgForm) {

    if (form.invalid) return;

    this.isLoading = true;

    this.authService.forgotPassword(form.value.email).subscribe({

      next: () => {
        this.message = 'Password reset email sent.';
        form.reset();
      },

      error: () => {
        this.message = 'Something went wrong.';
      },

      complete: () => {
        this.isLoading = false;
      }

    });
  }

}