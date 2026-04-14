// =====================================================
// 📦 EVENT TRACKING SERVICE (FINAL FIXED)
// =====================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  private readonly BASE_URL =
    'https://backend-ml-events-service-ba9v.onrender.com/api/events';

  constructor(private http: HttpClient) {}

  // =====================================================
  // 📊 TRACK EVENT (FINAL FIX)
  // =====================================================
  trackEvent(event: any) {

    const userId = this.getUserId();
    if (!userId) return;

    const payload = {
      user_id: userId,
      session_id: this.getSessionId(),

      event_type: event.event_type,

      // 🔥 FIX: ALWAYS SEND product
      object_type: 'product',

      object_id: event.object_id
        ? Number(event.object_id)
        : null,

      event_metadata: event.event_metadata || event.metadata || {}
    };

    this.http.post(this.BASE_URL, payload).subscribe({
      error: () => {}
    });
  }

  // =====================================================
  // 🔧 HELPERS
  // =====================================================

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
