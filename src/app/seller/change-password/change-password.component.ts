import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent {

  message = '';

  errorMessage = '';

  isLoading = false;


  constructor(

    private authService: AuthenticationService

  ) {}


  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  changePassword(form: NgForm): void {

    // =====================================================
    // RESET MESSAGES
    // =====================================================

    this.message = '';

    this.errorMessage = '';

    if (form.invalid) {
      return;
    }

    // =====================================================
    // PASSWORD MATCH CHECK
    // =====================================================

    if (

      form.value.new_password !==
      form.value.confirm_password

    ) {

      this.errorMessage =
        'New passwords do not match';

      return;

    }

    this.isLoading = true;


    // =====================================================
    // API CALL
    // =====================================================

    this.authService

      .changePassword({

        old_password:
          form.value.current_password,

        new_password:
          form.value.new_password

      })

      .subscribe({

        // =====================================================
        // SUCCESS
        // =====================================================

        next: (res: any) => {

          this.message =

            res.message ||

            'Password updated successfully';

          this.isLoading = false;

          form.resetForm();

        },


        // =====================================================
        // ERROR
        // =====================================================

        error: (err: any) => {

          this.errorMessage =

            err?.error?.error ||

            'Password update failed';

          this.isLoading = false;

        }

      });

  }

}