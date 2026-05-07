import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { ContactService }
from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-us',

  templateUrl: './contact-us.component.html',

  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent
implements OnInit {

  // =========================================
  // UI STATES
  // =========================================
  isSubmitting = false;

  successMessage = '';

  errorMessage = '';

  // =========================================
  // CONTACT FORM
  // =========================================
  contactForm = this.fb.group({

    name: [
      '',
      [Validators.required]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    subject: [
      '',
      [Validators.required]
    ],

    message: [
      '',
      [Validators.required]
    ]
  });

  constructor(

    private fb: FormBuilder,

    private contactService: ContactService

  ) {}

  // =========================================
  // INIT
  // =========================================
  ngOnInit(): void {

    // AUTO FILL USER DATA
    const user =
      localStorage.getItem('user');

    if (user) {

      const parsed = JSON.parse(user);

      this.contactForm.patchValue({

        name: parsed.name || '',

        email: parsed.email || ''
      });
    }
  }

  // =========================================
  // SUBMIT CONTACT REQUEST
  // =========================================
  submitContactRequest(): void {

    this.successMessage = '';

    this.errorMessage = '';

    if (this.contactForm.invalid) {

      this.errorMessage =
        'Please fill all required fields';

      return;
    }

    this.isSubmitting = true;

    this.contactService
      .createContactRequest(
        this.contactForm.value as any
      )
      .subscribe({

        next: (response) => {

          this.isSubmitting = false;

          this.successMessage =
            `Support request created successfully. Ticket ID: ${response.ticket_id}`;

          this.contactForm.reset();
        },

        error: (error) => {

          this.isSubmitting = false;

          this.errorMessage =

            error?.error?.message ||

            'Something went wrong';
        }
      });
  }
}