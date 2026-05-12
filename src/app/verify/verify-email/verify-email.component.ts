import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

export class VerifyEmailComponent implements OnInit {

  message = '';

  isLoading = true;

  token = '';


  constructor(

    private route: ActivatedRoute,

    private authService: AuthenticationService,

    private router: Router

  ) {}


  ngOnInit(): void {

    // =====================================================
    // GET TOKEN FROM URL PARAM
    // =====================================================

    this.token =
      this.route.snapshot.paramMap.get('token') || '';

    console.log(
      'VERIFY TOKEN:',
      this.token
    );

    // =====================================================
    // INVALID TOKEN CHECK
    // =====================================================

    if (!this.token) {

      this.message =
        'Invalid verification link';

      this.isLoading = false;

      return;
    }

    // =====================================================
    // VERIFY EMAIL API CALL
    // =====================================================

    this.authService
      .verifyEmail(this.token)
      .subscribe({

        next: (res: any) => {

          console.log(
            'VERIFY SUCCESS:',
            res
          );

          this.message =
            res.message ||
            'Email verified successfully';

          this.isLoading = false;

          // =====================================================
          // REDIRECT TO LOGIN
          // =====================================================

          setTimeout(() => {

            this.router.navigate([
              '/login'
            ]);

          }, 3000);

        },

        error: (err: any) => {

          console.log(
            'VERIFY ERROR:',
            err
          );

          if (
            err.error &&
            err.error.error
          ) {

            this.message =
              err.error.error;

          } else {

            this.message =
              'Verification failed or link expired';
          }

          this.isLoading = false;
        }

      });

  }

}