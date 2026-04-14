import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recommendation {
  product_id: number;
  score: number;
  rank: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private readonly BASE_URL =
    'https://backend-ml-recommendation-service-huu6.onrender.com/api';

  constructor(private http: HttpClient) {}

  getRecommendations(): Observable<Recommendation[]> {

    const user = localStorage.getItem('userLoggedIn');
    if (!user) return new Observable();

    const userId = JSON.parse(user).id;

    return this.http.get<Recommendation[]>(
      `${this.BASE_URL}/recommendations/${userId}`
    );
  }
}
