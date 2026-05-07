import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ContactRequest }
from '../models/contact-request.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // =========================================
  // RENDER BACKEND
  // =========================================
  private readonly BASE_URL =
    'https://backend-contact-service.onrender.com';

  // =========================================
  // LOCAL BACKEND
  // =========================================
  // private readonly BASE_URL =
  //   'http://127.0.0.1:5007';

  // =========================================
  // CONTACT API
  // =========================================
  private readonly CONTACT_API =
    `${this.BASE_URL}/api/v1/contact/create`;

  constructor(
    private http: HttpClient
  ) {}

  // =========================================
  // CREATE CONTACT REQUEST
  // =========================================
  createContactRequest(
    payload: ContactRequest
  ): Observable<any> {

    return this.http.post(
      this.CONTACT_API,
      payload
    );
  }
}