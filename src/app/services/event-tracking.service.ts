// =========================
// Event Tracking Service (FINAL - WORKING + DEBUG ✅)
// =========================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  // 🔥 FIXED ENDPOINT (IMPORTANT)
  private readonly BASE_URL =
    'https://backend-ml-events-service-ohhr.onrender.com/events';

  constructor(private http: HttpClient) {}

  // =========================
  // TRACK EVENT
  // =========================
  trackEvent(event: any) {

    const userId = this.getUserId();

    if (!userId) {
      console.warn("⚠️ No user logged in → event skipped");
      return;
    }

    const payload = {
      user_id: userId,
      session_id: this.getSessionId(),

      event_type: event.event_type,

      // backend expects this
      object_type: 'product',

      object_id: event.object_id
        ? Number(event.object_id)
        : null,

      event_metadata: event.event_metadata || {}
    };

    // 🔥 DEBUG LOG
    console.log("📡 Sending event:", payload);

    this.http.post(this.BASE_URL, payload).subscribe({
      next: (res) => {
        console.log("✅ Event sent successfully:", res);
      },
      error: (err) => {
        console.error("❌ Event failed:", err);
      }
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
