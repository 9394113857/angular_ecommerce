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
  loading = false;
  message = '';   // ✅ FIX ADDED

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  // ================================
  // LOAD PROFILE
  // ================================
  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.profile = res;
      },
      error: () => {
        alert('Failed to load profile');
      }
    });
  }

  // ================================
  // UPDATE PROFILE
  // ================================
  updateProfile(form: NgForm) {

    this.loading = true;

    this.authService.updateProfile({
      first_name: this.profile.first_name,
      last_name: this.profile.last_name,
      phone_number: this.profile.phone_number
    })
    .subscribe({
      next: () => {
        this.message = 'Profile updated successfully';
      },
      error: () => {
        this.message = 'Profile update failed';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // ================================
  // CHANGE PASSWORD
  // ================================
  changePassword(form: NgForm) {

    this.authService
      .changePassword({
        old_password: form.value.old_password,
        new_password: form.value.new_password
      })
      .subscribe({
        next: () => {

          alert('Password updated successfully. Please login again.');

          this.authService.logout();

          this.router.navigate(['/login']);

        },
        error: () => {
          alert('Password change failed');
        }
      });

  }

}