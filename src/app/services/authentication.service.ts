import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, SignUp } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // ================================
  // 🌱 LOCAL BACKEND (COMMENTED)
  // ================================
  private readonly LOCAL_BASE_URL =
    'http://127.0.0.1:5001/api/v1/auth/angularUser';

  // ================================
  // 🚀 RENDER BACKEND (ACTIVE NOW)
  // ================================
  // private readonly RENDER_BASE_URL =
  //   'https://backend-auth-service-6zwi.onrender.com/api/v1/auth/angularUser';

  // ✅ CURRENT ACTIVE BASE URL
  private readonly baseUrl = this.LOCAL_BASE_URL;

  // ================================
  authState$ = new BehaviorSubject<'default' | 'user' | 'seller'>('default');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initAuthState();
  }

  // ================================
  // 🔐 INIT AUTH STATE
  // ================================
  private initAuthState() {
    if (localStorage.getItem('sellerLoggedIn')) {
      this.authState$.next('seller');
    } else if (localStorage.getItem('userLoggedIn')) {
      this.authState$.next('user');
    } else {
      this.authState$.next('default');
    }
  }

  // ================================
  // 🚫 BLOCK LOGIN / REGISTER
  // ================================
  notAllowedAuth() {
    if (
      localStorage.getItem('sellerLoggedIn') ||
      localStorage.getItem('userLoggedIn')
    ) {
      this.router.navigate(['/']);
    }
  }

  // ================================
  // 📝 USER SIGNUP
  // ================================
  userSignup(data: SignUp) {
    return this.http.post(`${this.baseUrl}/register`, {
      email: data.email,
      password: data.password,
      role: data.role_type
    });
  }

  // ================================
  // 🔑 LOGIN
  // ================================
  loginUser(data: Login) {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  // ================================
  // 🔄 SET AUTH STATE
  // ================================
  setAuthState(role: 'user' | 'seller') {
    this.authState$.next(role);
  }

  // ================================
  // 🚪 LOGOUT
  // ================================
  logout() {
    localStorage.clear();
    this.authState$.next('default');
    this.router.navigate(['/login']);
  }
}
