import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class protectRouteGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isSeller = localStorage.getItem('sellerLoggedIn');
    const isUser = localStorage.getItem('userLoggedIn');

    // -------------------------------
    // SELLER ROUTES
    // -------------------------------
    if (state.url.startsWith('/seller')) {
      if (isSeller) {
        return true;
      } else {
        return this.router.createUrlTree(['/unauthorized']);
      }
    }

    // -------------------------------
    // USER ROUTES (cart, checkout, orders)
    // -------------------------------
    if (
      state.url.startsWith('/cart') ||
      state.url.startsWith('/checkout') ||
      state.url.startsWith('/orders')
    ) {
      if (isUser) {
        return true;
      } else {
        return this.router.createUrlTree(['/login']);
      }
    }

    // -------------------------------
    // DEFAULT: allow access
    // -------------------------------
    return true;
  }
}
