// =========================
// Cell 1: Recommendation Service (FINAL)
// =========================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Recommendation {
  user_id: number;
  product_id: number;
  score: number;
  rank: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  // LOCAL (commented)
  // private readonly BASE_URL = 'http://127.0.0.1:5000/api';

  // RENDER (LIVE)
  private readonly BASE_URL =
    'https://backend-ml-recommendation-service-huu6.onrender.com/api';

  constructor(private http: HttpClient) {}

  getRecommendations(): Observable<Recommendation[]> {

    const user = localStorage.getItem('userLoggedIn');

    if (!user) {
      console.warn('⚠️ No user found in localStorage');
      return of([]); // ✅ safe fallback
    }

    const userId = JSON.parse(user).id;

    return this.http.get<Recommendation[]>(
      `${this.BASE_URL}/recommendations/${userId}`
    );
  }
}
