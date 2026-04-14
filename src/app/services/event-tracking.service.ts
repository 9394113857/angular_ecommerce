// =====================================================
// 📦 EVENT TRACKING SERVICE (ULTIMATE STABLE VERSION)
// =====================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  private readonly BASE_URL =
    'https://backend-ml-events-service-ba9v.onrender.com';

  constructor(private http: HttpClient) {}

  // =====================================================
  // 📊 TRACK EVENT (FULLY FLEXIBLE - NO BUILD ERRORS)
  // =====================================================
  trackEvent(event: any) {

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

      // ✅ Accept any event type
      event_type: event.event_type || 'unknown',

      // ✅ Only assign for ML events
      object_type: ML_EVENTS.includes(event.event_type)
        ? 'product'
        : null,

      // ✅ Convert safely to number
      object_id: event.object_id
        ? Number(event.object_id)
        : null,

      // ✅ Support BOTH metadata formats
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
