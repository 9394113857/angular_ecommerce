import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})

export class SellerProfileComponent
implements OnInit {

  sellerData: any = {

    first_name: '',

    last_name: '',

    email: '',

    role: '',

    verified: false

  };

  message = '';

  isLoading = false;


  ngOnInit(): void {

    // =====================================================
    // LOAD SELLER
    // =====================================================

    const seller =
      localStorage.getItem('seller');

    if (seller) {

      const parsed =
        JSON.parse(seller);

      this.sellerData = {

        first_name:
          parsed.first_name || '',

        last_name:
          parsed.last_name || '',

        email:
          parsed.email || '',

        role:
          parsed.role || 'seller',

        verified:
          parsed.is_verified || false

      };

    }

  }


  // =====================================================
  // SAVE PROFILE
  // =====================================================

  saveProfile(form: NgForm): void {

    if (form.invalid) return;

    this.isLoading = true;

    // =====================================================
    // TEMP LOCAL SAVE
    // =====================================================

    localStorage.setItem(
      'seller',
      JSON.stringify(this.sellerData)
    );

    this.message =
      'Profile updated successfully';

    this.isLoading = false;

  }

}