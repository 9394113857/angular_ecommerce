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
  // BASE AUTH URL
  // =========================================
  private readonly AUTH_BASE =
    'http://127.0.0.1:5000/api/v1/auth';

  // =========================================
  // ANGULAR USER AUTH ROUTES
  // =========================================
  private readonly USER_AUTH =
    'http://127.0.0.1:5000/api/v1/auth/angularUser';

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
    }

    else if (localStorage.getItem('userLoggedIn')) {
      this.authState$.next('user');
    }

    else {
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
  // SIGNUP
  // =========================================
  userSignup(data: SignUp) {

    return this.http.post(`${this.USER_AUTH}/register`, {

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

    return this.http.post<any>(`${this.USER_AUTH}/login`, data);

  }

  // =========================================
  // VERIFY EMAIL
  // =========================================
  verifyEmail(token: string) {

    return this.http.get(`${this.USER_AUTH}/verify-email/${token}`);

  }

  // =========================================
  // FORGOT PASSWORD
  // =========================================
  forgotPassword(email: string) {

    return this.http.post(`${this.AUTH_BASE}/forgot-password`, { email });

  }

  // =========================================
  // RESET PASSWORD
  // =========================================
  resetPassword(token: string, password: string) {

    return this.http.post(`${this.AUTH_BASE}/reset-password/${token}`, {

      password

    });

  }

  // =========================================
  // GET PROFILE
  // =========================================
  getProfile() {

    return this.http.get(`${this.AUTH_BASE}/profile`);

  }

  // =========================================
  // UPDATE PROFILE
  // =========================================
  updateProfile(data: any) {

    return this.http.put(`${this.AUTH_BASE}/profile`, data);

  }

  // =========================================
  // CHANGE PASSWORD
  // =========================================
  changePassword(data: any) {

    return this.http.post(`${this.AUTH_BASE}/change-password`, data);

  }

  // =========================================
  // SET AUTH STATE
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