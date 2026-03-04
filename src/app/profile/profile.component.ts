import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  profile: any = {};
  message = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.authService.getProfile().subscribe((res: any) => {
      this.profile = res;
    });

  }

  updateProfile(form: NgForm) {

    this.authService.updateProfile(form.value).subscribe(() => {
      this.message = 'Profile updated successfully';
    });

  }

  changePassword(form: NgForm) {

    this.authService
      .changePassword(form.value.old_password, form.value.new_password)
      .subscribe({

        next: () => {

          alert('Password updated. Please login again.');

          localStorage.clear();

          this.router.navigate(['/login']);
        }

      });

  }

}