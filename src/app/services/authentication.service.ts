import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable,
  BehaviorSubject
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // =========================================================
  // LOCAL BACKEND (ACTIVE)
  // =========================================================

  private baseUrl =
    'http://127.0.0.1:5000/api/v1/auth';

  // =========================================================
  // LIVE BACKEND (COMMENTED)
  // =========================================================

  // private baseUrl =
  // 'https://backend-auth-service.onrender.com/api/v1/auth';


  // =========================================================
  // AUTH STATE
  // =========================================================

  private authStateSubject =
    new BehaviorSubject<'default' | 'seller' | 'user'>(
      'default'
    );

  authState$ =
    this.authStateSubject.asObservable();


  constructor(
    private http: HttpClient
  ) {

    // =====================================================
    // AUTO RESTORE STATE
    // =====================================================

    if (localStorage.getItem('sellerLoggedIn')) {

      this.authStateSubject.next('seller');

    } else if (localStorage.getItem('userLoggedIn')) {

      this.authStateSubject.next('user');

    } else {

      this.authStateSubject.next('default');
    }
  }


  // =========================================================
  // UPDATE AUTH STATE
  // =========================================================

  setAuthState(
    role: 'default' | 'seller' | 'user'
  ): void {

    this.authStateSubject.next(role);
  }


  // =========================================================
  // BLOCK AUTH PAGES
  // =========================================================

  notAllowedAuth(): void {

    if (
      localStorage.getItem('sellerLoggedIn')
    ) {

      this.routerRedirect('/seller-home');

      return;
    }

    if (
      localStorage.getItem('userLoggedIn')
    ) {

      this.routerRedirect('/');

      return;
    }
  }


  // =========================================================
  // COMPATIBILITY METHOD
  // =========================================================

  userSignup(data: any): Observable<any> {

    return this.registerUser(data);
  }


  // =========================================================
  // REGISTER
  // =========================================================

  registerUser(data: any): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/angularUser/register`,
      data
    );
  }


  // =========================================================
  // VERIFY EMAIL
  // =========================================================

  verifyEmail(token: string): Observable<any> {

    return this.http.get(
      `${this.baseUrl}/angularUser/verify-email/${token}`
    );
  }


  // =========================================================
  // LOGIN
  // =========================================================

  loginUser(data: any): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/angularUser/login`,
      data
    );
  }


  // =========================================================
  // PROFILE
  // =========================================================

  getProfile(): Observable<any> {

    return this.http.get(
      `${this.baseUrl}/profile`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =========================================================
  // UPDATE PROFILE
  // =========================================================

  updateProfile(data: any): Observable<any> {

    return this.http.put(
      `${this.baseUrl}/profile`,
      data,
      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =========================================================
  // CHANGE PASSWORD
  // =========================================================

  changePassword(data: any): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/change-password`,
      data,
      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  forgotPassword(email: string): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/forgot-password`,
      {
        email
      }
    );
  }


  // =========================================================
  // RESET PASSWORD
  // =========================================================

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


  // =========================================================
  // LOGOUT
  // =========================================================

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('sellerLoggedIn');

    localStorage.removeItem('userLoggedIn');

    localStorage.removeItem('access_token');

    localStorage.removeItem('refresh_token');

    localStorage.removeItem('role');

    localStorage.removeItem('userId');

    this.authStateSubject.next('default');

    window.location.reload();
  }


  // =========================================================
  // SAVE AUTH DATA
  // =========================================================

  saveAuthData(response: any): void {

    localStorage.setItem(
      'access_token',
      response.access_token
    );

    localStorage.setItem(
      'refresh_token',
      response.refresh_token
    );

    localStorage.setItem(
      'role',
      response.role
    );

    localStorage.setItem(
      'userId',
      response.userId
    );
  }


  // =========================================================
  // ACCESS TOKEN
  // =========================================================

  getAccessToken(): string | null {

    return localStorage.getItem(
      'access_token'
    );
  }


  // =========================================================
  // LOGIN CHECK
  // =========================================================

  isLoggedIn(): boolean {

    return !!(
      localStorage.getItem('token') ||
      localStorage.getItem('access_token')
    );
  }


  // =========================================================
  // AUTH HEADERS
  // =========================================================

  private getAuthHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token') ||
      localStorage.getItem('access_token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  // =========================================================
  // SIMPLE REDIRECT
  // =========================================================

  private routerRedirect(url: string): void {

    window.location.href = url;
  }

}