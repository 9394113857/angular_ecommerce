import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, SignUp } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // =========================================
  // 🌱 LOCAL BACKEND (USE FOR LOCAL TESTING)
  // =========================================
  private readonly LOCAL_BASE_URL =
    'http://127.0.0.1:5000/api/v1/auth/angularUser';

  // =========================================
  // 🚀 RAILWAY BACKEND (PRODUCTION)
  // =========================================
  // private readonly RAILWAY_BASE_URL =
  //   'https://mellow-illumination-production.up.railway.app/api/v1/auth/angularUser';

  // =========================================
  // ACTIVE BASE URL
  // =========================================
  private readonly baseUrl = this.LOCAL_BASE_URL;

  authState$ = new BehaviorSubject<'default' | 'user' | 'seller'>('default');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initAuthState();
  }

  // =========================================
  // INIT AUTH STATE
  // =========================================
  private initAuthState() {
    if (localStorage.getItem('sellerLoggedIn')) {
      this.authState$.next('seller');
    } else if (localStorage.getItem('userLoggedIn')) {
      this.authState$.next('user');
    } else {
      this.authState$.next('default');
    }
  }

  // =========================================
  // BLOCK AUTH PAGE IF ALREADY LOGGED IN
  // =========================================
  notAllowedAuth() {
    if (
      localStorage.getItem('sellerLoggedIn') ||
      localStorage.getItem('userLoggedIn')
    ) {
      this.router.navigate(['/']);
    }
  }

  // =========================================
  // USER SIGNUP
  // =========================================
  userSignup(data: SignUp) {
    return this.http.post(`${this.baseUrl}/register`, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password
    });
  }

  // =========================================
  // LOGIN
  // =========================================
  loginUser(data: Login) {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  // =========================================
  // VERIFY EMAIL
  // =========================================
  verifyEmail(token: string) {
    return this.http.get(`${this.baseUrl}/verify-email/${token}`);
  }

  // =========================================
  // FORGOT PASSWORD
  // =========================================
  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  // =========================================
  // RESET PASSWORD
  // =========================================
  resetPassword(token: string, password: string) {
    return this.http.post(`${this.baseUrl}/reset-password/${token}`, {
      password
    });
  }

  // =========================================
  // GET PROFILE
  // =========================================
  getProfile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  // =========================================
  // UPDATE PROFILE
  // =========================================
  updateProfile(data: any) {
    return this.http.put(`${this.baseUrl}/profile`, data);
  }

  // =========================================
  // CHANGE PASSWORD
  // =========================================
  changePassword(data: any) {
    return this.http.post(`${this.baseUrl}/change-password`, data);
  }

  // =========================================
  // AUTH STATE
  // =========================================
  setAuthState(role: 'user' | 'seller') {
    this.authState$.next(role);
  }

  // =========================================
  // LOGOUT
  // =========================================
  logout() {
    localStorage.clear();
    this.authState$.next('default');
    this.router.navigate(['/login']);
  }
}