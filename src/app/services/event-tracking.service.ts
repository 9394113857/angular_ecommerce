// =========================
// Event Tracking Service (FINAL - PRODUCTION READY ✅)
// =========================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  // ✅ FINAL CLEAN BACKEND API
  private readonly BASE_URL =
    'https://backend-ml-events-service-ohhr.onrender.com/api/v1/events';

  constructor(private http: HttpClient) {}

  // =========================
  // TRACK EVENT
  // =========================
  trackEvent(event: any): void {

    const userId = this.getUserId();
    if (!userId) return;

    const payload = {
      user_id: userId,
      session_id: this.getSessionId(),
      event_type: event.event_type,
      object_type: 'product',
      object_id: event.object_id ? Number(event.object_id) : null,
      event_metadata: event.event_metadata || {}
    };

    this.http.post(this.BASE_URL, payload).subscribe();
  }

  // =========================
  // HELPERS
  // =========================
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
