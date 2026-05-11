import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import {
  Login,
  SignUp
} from 'src/data.type';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // =====================================================
  // 🌱 LOCAL BACKEND ACTIVE
  // =====================================================

  private readonly LOCAL_BASE_URL =
    'http://127.0.0.1:5000/api/v1/auth';

  // =====================================================
  // 🚀 LIVE BACKEND
  // =====================================================

  // private readonly LIVE_BASE_URL =
  // 'https://backend-auth-service-ks6f.onrender.com/api/v1/auth';

  private readonly baseUrl =
    this.LOCAL_BASE_URL;


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

      this.authState$.next('seller');

    } else if (
      localStorage.getItem('userLoggedIn')
    ) {

      this.authState$.next('user');

    } else {

      this.authState$.next('default');
    }
  }


  // =====================================================
  // BLOCK AUTH PAGES
  // =====================================================

  notAllowedAuth(): void {

    if (
      localStorage.getItem('sellerLoggedIn') ||
      localStorage.getItem('userLoggedIn')
    ) {

      this.router.navigate(['/']);
    }
  }


  // =====================================================
  // REGISTER
  // =====================================================

  userSignup(data: SignUp) {

    return this.http.post(

      `${this.baseUrl}/angularUser/register`,

      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        role_type: data.role_type
      }
    );
  }


  // =====================================================
  // VERIFY EMAIL
  // =====================================================

  verifyEmail(token: string) {

    return this.http.get(

      `${this.baseUrl}/angularUser/verify-email/${token}`
    );
  }


  // =====================================================
  // LOGIN
  // =====================================================

  loginUser(data: Login) {

    return this.http.post<any>(

      `${this.baseUrl}/angularUser/login`,

      data
    );
  }


  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  forgotPassword(email: string) {

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
  ) {

    return this.http.post(

      `${this.baseUrl}/reset-password/${token}`,

      {
        password
      }
    );
  }


  // =====================================================
  // PROFILE
  // =====================================================

  getProfile() {

    return this.http.get(

      `${this.baseUrl}/profile`,

      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  updateProfile(data: any) {

    return this.http.put(

      `${this.baseUrl}/profile`,

      data,

      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  changePassword(data: any) {

    return this.http.post(

      `${this.baseUrl}/change-password`,

      data,

      {
        headers: this.getAuthHeaders()
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

    localStorage.clear();

    this.authState$.next('default');

    this.router.navigate(['/login']);
  }


  // =====================================================
  // AUTH HEADERS
  // =====================================================

  private getAuthHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

}