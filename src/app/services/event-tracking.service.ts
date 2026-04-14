// =====================================================
// 📦 EVENT TRACKING SERVICE (FINAL STABLE VERSION)
// =====================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  // =====================================================
  // 🚀 ML EVENTS SERVICE (RAILWAY / RENDER)
  // =====================================================
  private readonly BASE_URL =
    'https://backend-ml-events-service-production.up.railway.app/api/events';

  constructor(private http: HttpClient) {}

  // =====================================================
  // 📊 TRACK EVENT (SAFE + FLEXIBLE + ML READY)
  // =====================================================
  trackEvent(event: {
    event_type: string;           // ✅ allow all events (NO BUILD BREAK)
    object_id?: number;           // ✅ must be number (IMPORTANT)
    event_metadata?: any;
  }) {

    const userId = this.getUserId();

    // 🔴 Skip if user not logged (ML needs user_id)
    if (!userId) return;

    // =====================================================
    // 🎯 ML EVENTS (ONLY THESE USED IN PIPELINE)
    // =====================================================
    const ML_EVENTS = [
      'view_product',
      'add_to_cart',
      'checkout',
      'remove_from_cart'
    ];

    const payload = {
      user_id: userId,
      session_id: this.getSessionId(),

      // ✅ send any event (no restriction)
      event_type: event.event_type,

      // ✅ only ML events tagged as product
      object_type: ML_EVENTS.includes(event.event_type)
        ? 'product'
        : null,

      // ✅ ensure number (IMPORTANT)
      object_id: event.object_id,

      // ✅ match backend field
      event_metadata: event.event_metadata || {}
    };

    // 🔥 Fire & forget (non-blocking)
    this.http.post(this.BASE_URL, payload).subscribe({
      error: () => {} // silent fail (by design)
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
