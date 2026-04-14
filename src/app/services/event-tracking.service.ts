// =====================================================
// 📦 EVENT TRACKING SERVICE (FINAL STABLE + ML READY)
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
  // 📊 TRACK EVENT (FINAL VERSION)
  // =====================================================
  trackEvent(event: {
    event_type: string;          // ✅ allow ALL events (fix build errors)
    object_id?: number;          // ✅ must be number (no toString)
    event_metadata?: any;
  }) {

    const userId = this.getUserId();

    // 🔴 Skip if user not logged (required for ML)
    if (!userId) return;

    // =====================================================
    // 🎯 ONLY THESE EVENTS USED BY ML PIPELINE
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

      // ✅ Allow any event (no Angular build break)
      event_type: event.event_type,

      // ✅ Only ML events tagged for pipeline
      object_type: ML_EVENTS.includes(event.event_type)
        ? 'product'
        : null,

      // ✅ Always number (IMPORTANT)
      object_id: event.object_id,

      // ✅ Match backend field name
      event_metadata: event.event_metadata || {}
    };

    // 🔥 Fire & forget (non-blocking UI)
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
