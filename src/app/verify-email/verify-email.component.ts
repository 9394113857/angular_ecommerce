import { Component, OnInit } from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  AuthenticationService
} from '../services/authentication.service';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

export class VerifyEmailComponent
implements OnInit {

  message =
    'Verifying your email...';

  loading = true;


  constructor(

    private route: ActivatedRoute,

    private authService: AuthenticationService,

    private router: Router

  ) {}


  ngOnInit(): void {

    const token =
      this.route.snapshot.queryParamMap.get(
        'token'
      );

    if (!token) {

      this.message =
        'Invalid verification link';

      this.loading = false;

      return;
    }

    this.authService
      .verifyEmail(token)

      .subscribe({

        next: () => {

          this.message =
            'Email verified successfully. Redirecting to login...';

          setTimeout(() => {

            this.router.navigate([
              '/login'
            ]);

          }, 3000);
        },

        error: () => {

          this.message =
            'Verification failed or link expired';

          this.loading = false;
        }

      });
  }

}