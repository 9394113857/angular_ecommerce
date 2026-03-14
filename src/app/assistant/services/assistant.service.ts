import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  private BASE_URL =
    'https://assistant-service-production-4c1b.up.railway.app/api/v1/assistant';

  constructor(private http: HttpClient) {}

  sendMessage(userId: number | null, message: string): Observable<ChatResponse> {

    const payload: any = {
      message: message
    };

    if (userId !== null) {
      payload.user_id = userId;
    }

    return this.http.post<ChatResponse>(
      `${this.BASE_URL}/chat`,
      payload
    );
  }
}