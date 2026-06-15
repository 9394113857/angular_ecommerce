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
  // 🌱 LOCAL BACKEND
  // ================================
  private readonly LOCAL_BASE_URL =
    'http://127.0.0.1:5001/api/v1/auth/angularUser';

  // ================================
  // 🚀 RENDER BACKEND
  // ================================
  private readonly RENDER_BASE_URL =
    'https://backend-auth-service-ks6f.onrender.com/api/v1/auth/angularUser';

  // ================================
  // ☸️ GKE BACKEND
  // ================================
  private readonly GKE_BASE_URL =
    'http://8.228.229.55/api/v1/auth/angularUser';

  // ================================
  // ACTIVE BASE URL (ONLY ONE ACTIVE)
  // ================================

  private readonly baseUrl = this.LOCAL_BASE_URL;
  // private readonly baseUrl = this.RENDER_BASE_URL;
  // private readonly baseUrl = this.GKE_BASE_URL;

  authState$ =
    new BehaviorSubject<'default' | 'user' | 'seller'>('default');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initAuthState();
  }

  private initAuthState(): void {
    if (localStorage.getItem('sellerLoggedIn')) {
      this.authState$.next('seller');
    } else if (localStorage.getItem('userLoggedIn')) {
      this.authState$.next('user');
    } else {
      this.authState$.next('default');
    }
  }

  notAllowedAuth(): void {
    if (
      localStorage.getItem('sellerLoggedIn') ||
      localStorage.getItem('userLoggedIn')
    ) {
      this.router.navigate(['/']);
    }
  }

  userSignup(data: SignUp) {
    return this.http.post(`${this.baseUrl}/register`, {
      email: data.email,
      password: data.password,
      role: data.role_type
    });
  }

  loginUser(data: Login) {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  setAuthState(role: 'user' | 'seller') {
    this.authState$.next(role);
  }

  logout() {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');

    this.http.post(
      `${this.baseUrl.replace('/angularUser', '')}/logout`,
      {
        refresh_token: refreshToken
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    ).subscribe({
      next: () => {
        localStorage.clear();
        this.authState$.next('default');
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.clear();
        this.authState$.next('default');
        this.router.navigate(['/login']);
      }
    });
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');

    return this.http.post<any>(
      `${this.baseUrl.replace('/angularUser', '')}/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }
    );
  }
}