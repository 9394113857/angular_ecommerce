// =========================
// Event Tracking Service (FINAL DEBUG + FIXED ✅)
// =========================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  // 🔥 FIX: TRY /events INSTEAD OF /api/events
  private readonly BASE_URL =
    'https://backend-ml-events-service-ohhr.onrender.com/events';

  constructor(private http: HttpClient) {}

  // =========================
  // TRACK EVENT
  // =========================
  trackEvent(event: any) {

    const userId = this.getUserId();
    if (!userId) {
      console.warn("⚠️ No user found, skipping event");
      return;
    }

    const payload = {
      user_id: userId,
      session_id: this.getSessionId(),
      event_type: event.event_type,
      object_type: 'product',
      object_id: event.object_id ? Number(event.object_id) : null,
      event_metadata: event.event_metadata || {}
    };

    console.log("📡 Sending event:", payload);

    this.http.post(this.BASE_URL, payload).subscribe({
      next: (res) => console.log("✅ Event sent successfully", res),
      error: (err) => console.error("❌ Event failed", err)
    });
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
