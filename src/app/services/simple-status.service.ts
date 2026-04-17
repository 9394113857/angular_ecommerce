import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppStatus = 'checking' | 'almost' | 'finalizing' | 'ready';

@Injectable({
  providedIn: 'root'
})
export class SimpleStatusService {

  private status = new BehaviorSubject<AppStatus>('checking');
  status$ = this.status.asObservable();

  setStatus(s: AppStatus) {
    this.status.next(s);
  }
}