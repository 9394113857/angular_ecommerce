import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { login, signUp } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // =====================================================
  // LOCAL DEVELOPMENT AUTH SERVICE (COMMENTED)
  // =====================================================
  baseUrl = 'http://127.0.0.1:5001/api/v1/auth/angularUser';

  // =====================================================
  // PRODUCTION AUTH SERVICE (RENDER) ✅ ACTIVE
  // =====================================================
  // baseUrl = 'https://backend-auth-service-6zwi.onrender.com/api/v1/auth/angularUser';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // -----------------------------------------------------
  // USER SIGNUP
  // -----------------------------------------------------
  userSignup(data: signUp) {
    return this.http.post(`${this.baseUrl}/register`, {
      email: data.email,
      password: data.password,
      role: data.role_type
    });
  }

  // -----------------------------------------------------
  // USER LOGIN
  // -----------------------------------------------------
  loginUser(data: login) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  // -----------------------------------------------------
  // BLOCK AUTH PAGES IF LOGGED IN
  // -----------------------------------------------------
  notAllowedAuth() {
    if (
      localStorage.getItem('sellerLoggedIn') ||
      localStorage.getItem('userLoggedIn')
    ) {
      this.router.navigate(['/']);
    }
  }

  // -----------------------------------------------------
  // LOGOUT
  // -----------------------------------------------------
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
