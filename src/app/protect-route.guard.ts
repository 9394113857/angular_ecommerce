
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class protectRouteGuard implements CanActivate{
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('sellerLoggedIn')){
       return true;
      }else {
        // Redirect to "Unauthorized access" page or component
        return this.router.navigate(['/unauthorized']);
      }
  }
  
} 