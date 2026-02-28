import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  // ============================================
  // 🌱 LOCAL BACKEND (COMMENTED FOR DEV)
  // ============================================
  // private BASE_URL = 'http://127.0.0.1:5000/api/v1/assistant';

  // ============================================
  // 🚀 PRODUCTION BACKEND (RAILWAY)
  // ============================================
  private BASE_URL = 'https://assistant-service-production-4c1b.up.railway.app/api/v1/assistant';

  constructor(private http: HttpClient) {}

  sendMessage(userId: number, message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(
      `${this.BASE_URL}/chat`,
      {
        user_id: userId,
        message: message
      }
    );
  }
}