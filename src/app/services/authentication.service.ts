// =====================================================
// 🔐 AUTHENTICATION SERVICE
// 2026 AUTH + PROFILE + VERIFY EMAIL FLOW
// =====================================================

import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Router } from '@angular/router';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';

import {
  Login,
  SignUp
} from 'src/data.type';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // =====================================================
  // 🌱 LOCAL BACKEND
  // =====================================================

  // private readonly LOCAL_BASE_URL =
  // 'http://127.0.0.1:5000/api/v1/auth';


  // =====================================================
  // 🚀 LIVE RENDER BACKEND
  // =====================================================

  private readonly LIVE_BASE_URL =
    'https://backend-auth-service-dgfi.onrender.com/api/v1/auth';


  // =====================================================
  // ACTIVE BASE URL
  // =====================================================

  private readonly baseUrl =
    this.LIVE_BASE_URL;


  // =====================================================
  // AUTH STATE
  // =====================================================

  authState$ =
    new BehaviorSubject<
      'default' | 'user' | 'seller'
    >('default');


  constructor(

    private http: HttpClient,

    private router: Router

  ) {

    this.initAuthState();
  }


  // =====================================================
  // INIT AUTH STATE
  // =====================================================

  private initAuthState(): void {

    if (localStorage.getItem('sellerLoggedIn')) {

      this.authState$.next(
        'seller'
      );

    } else if (
      localStorage.getItem('userLoggedIn')
    ) {

      this.authState$.next(
        'user'
      );

    } else {

      this.authState$.next(
        'default'
      );
    }

  }


  // =====================================================
  // BLOCK AUTH PAGES IF LOGGED IN
  // =====================================================

  notAllowedAuth(): void {

    if (

      localStorage.getItem('sellerLoggedIn')

      ||

      localStorage.getItem('userLoggedIn')

    ) {

      this.router.navigate(['/']);
    }

  }


  // =====================================================
  // REGISTER USER
  // =====================================================

  userSignup(
    data: SignUp
  ): Observable<any> {

    return this.http.post(

      `${this.baseUrl}/angularUser/register`,

      {

        first_name:
          data.first_name,

        last_name:
          data.last_name,

        email:
          data.email,

        password:
          data.password,

        role:
          data.role_type
      }

    );

  }


  // =====================================================
  // LOGIN USER
  // =====================================================

  loginUser(
    data: Login
  ): Observable<any> {

    return this.http.post<any>(

      `${this.baseUrl}/angularUser/login`,

      data

    );

  }


  // =====================================================
// VERIFY EMAIL
// =====================================================

verifyEmail(
  token: string
): Observable<any> {

  return this.http.get(

    `${this.baseUrl}/angularUser/verify-email/${token}`

  );

}


  // =====================================================
  // GET PROFILE
  // =====================================================

  getProfile(): Observable<any> {

    return this.http.get(

      `${this.baseUrl}/profile`,

      {
        headers:
          this.getAuthHeaders()
      }

    );

  }


  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  updateProfile(
    data: any
  ): Observable<any> {

    return this.http.put(

      `${this.baseUrl}/profile`,

      data,

      {
        headers:
          this.getAuthHeaders()
      }

    );

  }


  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  changePassword(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.baseUrl}/change-password`,

      data,

      {
        headers:
          this.getAuthHeaders()
      }

    );

  }


  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  forgotPassword(
    email: string
  ): Observable<any> {

    return this.http.post(

      `${this.baseUrl}/forgot-password`,

      {
        email
      }

    );

  }


  // =====================================================
  // RESET PASSWORD
  // =====================================================

  resetPassword(
    token: string,
    password: string
  ): Observable<any> {

    return this.http.post(

      `${this.baseUrl}/reset-password/${token}`,

      {
        password
      }

    );

  }


  // =====================================================
  // SET AUTH STATE
  // =====================================================

  setAuthState(
    role: 'user' | 'seller'
  ): void {

    this.authState$.next(role);

  }


  // =====================================================
  // LOGOUT
  // =====================================================

  logout(): void {

    this.http.post(

      `${this.baseUrl}/logout`,

      {},

      {
        headers:
          this.getAuthHeaders()
      }

    ).subscribe({

      next: () => {

        localStorage.clear();

        this.authState$.next(
          'default'
        );

        this.router.navigate([
          '/login'
        ]);
      },

      error: () => {

        localStorage.clear();

        this.authState$.next(
          'default'
        );

        this.router.navigate([
          '/login'
        ]);
      }

    });

  }


  // =====================================================
  // AUTH HEADERS
  // =====================================================

  private getAuthHeaders():
  HttpHeaders {

    return new HttpHeaders({

      Authorization:
        `Bearer ${localStorage.getItem('token')}`

    });

  }

}