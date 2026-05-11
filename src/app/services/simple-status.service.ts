import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


export type ServiceStatus =
  | 'checking'
  | 'almost'
  | 'finalizing'
  | 'ready';


@Injectable({
  providedIn: 'root'
})

export class SimpleStatusService {

  private statusSubject =
    new BehaviorSubject<ServiceStatus>(
      'checking'
    );

  status$ =
    this.statusSubject.asObservable();


  setStatus(status: ServiceStatus): void {

    this.statusSubject.next(status);
  }

}