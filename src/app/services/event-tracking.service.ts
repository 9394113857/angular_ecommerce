// src/app/services/event-tracking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  private readonly BASE_URL =
    'https://backend-ml-events-service-production.up.railway.app/api/events';

  constructor(private http: HttpClient) {}

  trackEvent(event: {
    event_type: string;   // ✅ FIXED (IMPORTANT)
    object_id?: number;
    event_metadata?: any;
  }) {

    const userId = this.getUserId();
    if (!userId) return;

    const ML_EVENTS = [
      'view_product',
      'add_to_cart',
      'checkout',
      'remove_from_cart'
    ];

    const payload = {
      user_id: userId,
      session_id: this.getSessionId(),
      event_type: event.event_type,
      object_type: ML_EVENTS.includes(event.event_type) ? 'product' : null,
      object_id: event.object_id,
      event_metadata: event.event_metadata || {}
    };

    this.http.post(this.BASE_URL, payload).subscribe({
      error: () => {}
    });
  }

  private getUserId(): number | null {
    const user = localStorage.getItem('userLoggedIn');
    return user ? JSON.parse(user).id : null;
  }

  private getSessionId(): string {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }
}
