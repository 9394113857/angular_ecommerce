import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login, SignUp } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'http://127.0.0.1:5001/api/v1/auth/angularUser';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  userSignup(data: SignUp) {
    return this.http.post(`${this.baseUrl}/register`, {
      email: data.email,
      password: data.password,
      role: data.role_type
    });
  }

  loginUser(data: Login) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  notAllowedAuth() {
    if (
      localStorage.getItem('sellerLoggedIn') ||
      localStorage.getItem('userLoggedIn')
    ) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
