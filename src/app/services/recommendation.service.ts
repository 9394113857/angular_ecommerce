import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  // LOCAL
  // private baseUrl = 'http://127.0.0.1:5005/api';

  // PRODUCTION (Render)
  private baseUrl = 'https://backend-ml-recommendation-service.onrender.com/api';

  constructor(private http: HttpClient) {}

  getRecommendations(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recommendations/${userId}`);
  }
}
