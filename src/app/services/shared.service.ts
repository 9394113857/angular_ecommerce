import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isSellerLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getInitialSellerLoggedInState());
  public isSellerLoggedIn$ = this.isSellerLoggedInSubject.asObservable();

  constructor() { }

  private getInitialSellerLoggedInState(): boolean {
    const isSellerLoggedInLs = localStorage.getItem('sellerLoggedIn');
    return isSellerLoggedInLs ? true : false;
  }


  setIsSellerLoggedIn(value: boolean): void {
    this.isSellerLoggedInSubject.next(value);
  }
}
