// =====================================================
// 📦 EVENT TRACKING SERVICE (FINAL WORKING VERSION)
// =====================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  // ✅ FIXED: Correct API endpoint
  private readonly BASE_URL =
    'https://backend-ml-events-service-ba9v.onrender.com/api/events';

  constructor(private http: HttpClient) {}

  // =====================================================
  // 📊 TRACK EVENT
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

      event_type: event.event_type || 'unknown',

      object_type: ML_EVENTS.includes(event.event_type)
        ? 'product'
        : null,

      object_id: event.object_id
        ? Number(event.object_id)
        : null,

      event_metadata: event.event_metadata || event.metadata || {}
    };

    // 🔥 CORRECT API CALL
    this.http.post(this.BASE_URL, payload).subscribe({
      next: () => {
        console.log('✅ Event sent:', payload); // optional debug
      },
      error: (err) => {
        console.error('❌ Event error:', err); // temporary debug
      }
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
