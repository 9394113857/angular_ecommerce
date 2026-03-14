import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatResponse {
  response: string;
  intent?: string;
  confidence?: number;
  model_version?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  // ============================================
  // LOCAL BACKEND
  // ============================================
  // private BASE_URL = 'http://127.0.0.1:5000/api/v1/assistant';

  // ============================================
  // PRODUCTION BACKEND
  // ============================================
  private BASE_URL =
    'https://assistant-service-production-4c1b.up.railway.app/api/v1/assistant';

  constructor(private http: HttpClient) {}

  sendMessage(userId: number | null, message: string): Observable<ChatResponse> {

    const token = localStorage.getItem('access_token');

    const payload: any = {
      message: message
    };

    if (userId) {
      payload.user_id = userId;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<ChatResponse>(
      `${this.BASE_URL}/chat`,
      payload,
      { headers }
    );

  }

}