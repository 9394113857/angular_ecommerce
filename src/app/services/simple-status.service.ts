// ======================================================
// 🚀 MULTI SERVICE STATUS SYSTEM (NEW)
// ======================================================

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// ✅ STATUS TYPES
export type ServiceState = 'warming' | 'up' | 'down';

// ✅ SERVICE MODEL
export interface ServiceStatus {
  name: string;
  status: ServiceState;
}

@Injectable({
  providedIn: 'root'
})
export class SimpleStatusService {

  // ======================================================
  // ✅ DEFAULT SERVICES
  // ======================================================

  private services = new BehaviorSubject<ServiceStatus[]>([
    {
      name: 'Auth Service',
      status: 'warming'
    },
    {
      name: 'Product Service',
      status: 'warming'
    },
    {
      name: 'Cart Service',
      status: 'warming'
    },
    {
      name: 'ML Events',
      status: 'warming'
    },
    {
      name: 'ML Recommendation',
      status: 'warming'
    }
  ]);

  services$ = this.services.asObservable();

  // ======================================================
  // ✅ UPDATE SERVICE STATUS
  // ======================================================

  updateServiceStatus(
    name: string,
    status: ServiceState
  ): void {

    const updated = this.services.value.map(service => {

      if (service.name === name) {

        return {
          ...service,
          status
        };

      }

      return service;

    });

    this.services.next(updated);
  }
}