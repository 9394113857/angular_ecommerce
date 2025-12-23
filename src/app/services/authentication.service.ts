import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { login, signUp } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Track seller login state
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ✅ AUTH BACKEND (LOCAL)
  baseUrl = 'http://127.0.0.1:5001/api/v1/auth/angularUser';

  // -------------------------------
  // USER / SELLER REGISTER
  // -------------------------------
  userSignup(data: signUp) {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  // -------------------------------
  // USER / SELLER LOGIN
  // -------------------------------
  loginUser(data: login) {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  // -------------------------------
  // RELOAD SELLER SESSION
  // -------------------------------
  reloadSeller() {
    if (localStorage.getItem('sellerLoggedIn')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  // -------------------------------
  // PREVENT AUTH PAGE ACCESS
  // -------------------------------
  notAllowedAuth() {
    if (
      localStorage.getItem('sellerLoggedIn') ||
      localStorage.getItem('userLoggedIn')
    ) {
      this.router.navigate(['/']);
    }
  }

  // -------------------------------
  // LOGOUT (Frontend only)
  // -------------------------------
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('sellerLoggedIn');
    localStorage.removeItem('userLoggedIn');
    this.isSellerLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
