import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export type AppStatus =
  'checking' |
  'almost' |
  'finalizing' |
  'ready';

@Injectable({
  providedIn: 'root'
})

export class SimpleStatusService {

  // =====================================================
  // SIMPLE STATUS FLOW
  // =====================================================

  private status =
    new BehaviorSubject<AppStatus>(
      'checking'
    );

  status$ =
    this.status.asObservable();

  setStatus(s: AppStatus) {

    this.status.next(s);

  }

  // =====================================================
  // BACKWARD COMPATIBILITY
  // EXISTING APP.COMPONENT.TS USES THIS
  // =====================================================

  updateServiceStatus(
    serviceName: string,
    status: string
  ) {

    console.log(
      'Service:',
      serviceName,
      'Status:',
      status
    );

  }

}