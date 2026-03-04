import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, SignUp } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // =========================================
  // 🌱 LOCAL BACKEND (COMMENTED)
  // =========================================
  private readonly LOCAL_BASE_URL =
  'http://127.0.0.1:5001/api/v1/auth';

  // =========================================
  // 🚀 RAILWAY BACKEND (ACTIVE)
  // =========================================
  // private readonly RAILWAY_BASE_URL =
  // 'https://mellow-illumination-production.up.railway.app/api/v1/auth';

  // ACTIVE BASE URL
  private readonly baseUrl = this.LOCAL_BASE_URL;

  // =========================================
  authState$ = new BehaviorSubject<'default' | 'user' | 'seller'>('default');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initAuthState();
  }

  // =========================================
  // 🔐 INIT AUTH STATE
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
  // 🚫 BLOCK LOGIN / REGISTER
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
  // 📝 USER SIGNUP
  // =========================================
  userSignup(data: SignUp) {
    return this.http.post(`${this.baseUrl}/angularUser/register`, {
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name
    });
  }

  // =========================================
  // 🔑 LOGIN
  // =========================================
  loginUser(data: Login) {
    return this.http.post<any>(
      `${this.baseUrl}/angularUser/login`,
      data
    );
  }

  // =========================================
  // 📧 VERIFY EMAIL
  // =========================================
  verifyEmail(token: string) {
    return this.http.get(`${this.baseUrl}/verify-email/${token}`);
  }

  // =========================================
  // 🔁 FORGOT PASSWORD
  // =========================================
  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/forgot-password`, {
      email: email
    });
  }

  // =========================================
  // 🔐 RESET PASSWORD
  // =========================================
  resetPassword(token: string, password: string) {
    return this.http.post(`${this.baseUrl}/reset-password/${token}`, {
      password: password
    });
  }

  // =========================================
  // 👤 GET PROFILE
  // =========================================
  getProfile() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/profile`, { headers });
  }

  // =========================================
  // ✏️ UPDATE PROFILE
  // =========================================
  updateProfile(data: any) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`${this.baseUrl}/profile`, data, { headers });
  }

  // =========================================
  // 🔑 CHANGE PASSWORD
  // =========================================
  changePassword(oldPassword: string, newPassword: string) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(
      `${this.baseUrl}/change-password`,
      {
        old_password: oldPassword,
        new_password: newPassword
      },
      { headers }
    );
  }

  // =========================================
  // 🚪 LOGOUT
  // =========================================
  logout() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post(`${this.baseUrl}/logout`, {}, { headers }).subscribe();

    localStorage.clear();
    this.authState$.next('default');

    this.router.navigate(['/login']);
  }

  // =========================================
  // 🔄 SET AUTH STATE
  // =========================================
  setAuthState(role: 'user' | 'seller') {
    this.authState$.next(role);
  }

}