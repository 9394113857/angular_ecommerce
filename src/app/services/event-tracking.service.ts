// =====================================================
// 📦 EVENT TRACKING SERVICE (FINAL ML ALIGNED)
// =====================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  // 🚀 ML EVENTS SERVICE (RENDER / RAILWAY)
  private readonly BASE_URL =
    'https://backend-ml-events-service-production.up.railway.app/api/events';

  constructor(private http: HttpClient) {}

  // =====================================================
  // 📊 TRACK EVENT (STRICT + ML SAFE)
  // =====================================================
  trackEvent(event: {
    event_type: 'view_product' | 'add_to_cart' | 'checkout' | 'remove_from_cart';
    object_id?: number;
    event_metadata?: any;
  }) {

    const userId = this.getUserId();

    // 🔴 CRITICAL: Skip if no user
    if (!userId) return;

    const payload = {
      user_id: userId,
      session_id: this.getSessionId(),

      // 🔴 MUST MATCH PIPELINE
      event_type: event.event_type,
      object_type: 'product',

      // 🔴 Ensure number
      object_id: event.object_id,

      // 🔴 Match backend field
      event_metadata: event.event_metadata || {}
    };

    // 🔥 Fire & forget
    this.http.post(this.BASE_URL, payload).subscribe({
      error: () => {} // silent fail
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
