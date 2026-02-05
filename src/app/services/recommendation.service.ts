import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  // =====================================
  // 🌱 LOCAL ML RECOMMENDATION SERVICE (COMMENTED)
  // =====================================
  // private readonly LOCAL_BASE_URL =
  //   'http://127.0.0.1:5005/api';

  // =====================================
  // 🚀 PRODUCTION ML RECOMMENDATION SERVICE (RENDER)
  // =====================================
  private readonly RENDER_BASE_URL =
    'https://backend-ml-recommendation-service.onrender.com/api';

  // ✅ ACTIVE BASE URL
  private readonly baseUrl = this.RENDER_BASE_URL;

  constructor(private http: HttpClient) {}

  // ==============================
  // 🤖 GET RECOMMENDATIONS
  // ==============================
  getRecommendations(userId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/recommendations/${userId}`
    );
  }
}
