import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {

  // 🔁 Local ML Events Service
  // Later replace with Render URL
  private baseUrl = 'http://127.0.0.1:5003/api/events';

  constructor(private http: HttpClient) {}

  trackEvent(event: {
    event_type: string;
    object_type?: string;
    object_id?: string;
    metadata?: any;
  }) {
    const payload = {
      ...event,
      session_id: this.getSessionId(),
      user_id: this.getUserId()
    };

    // fire & forget (never block UI)
    this.http.post(this.baseUrl, payload).subscribe({
      error: () => {}
    });
  }

  // ------------------------
  // HELPERS
  // ------------------------
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
