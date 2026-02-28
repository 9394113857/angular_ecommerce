import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.warmUpBackends();
  }

  /**
   * =====================================================
   * 🚀 Railway Cold-Start Warmup (BASE URLs ONLY)
   * =====================================================
   * Purpose:
   * - Wake Railway containers on app load
   * - Ignore responses & errors
   * - Just trigger the containers
   */
  warmUpBackends(): void {

    // 🔐 1) Auth Service
    this.http.get(
      'https://mellow-illumination-production.up.railway.app'
    ).subscribe({ error: () => {} });

    // 📦 2) Product Service
    setTimeout(() => {
      this.http.get(
        'https://product-backend-production-8593.up.railway.app'
      ).subscribe({ error: () => {} });
    }, 500);

    // 🛒 3) Cart / Order Service
    setTimeout(() => {
      this.http.get(
        'https://backend-cart-order-service-production.up.railway.app'
      ).subscribe({ error: () => {} });
    }, 1000);

    // 📊 4) ML Events Service
    setTimeout(() => {
      this.http.get(
        'https://backend-ml-events-service-production.up.railway.app'
      ).subscribe({ error: () => {} });
    }, 1500);

    // 🤖 5) ML Recommendation Service
    setTimeout(() => {
      this.http.get(
        'https://backend-ml-recommendation-service-production.up.railway.app'
      ).subscribe({ error: () => {} });
    }, 2000);

    // 🧠 6) Assistant Service (NEW)
    setTimeout(() => {
      this.http.get(
        'https://assistant-service-production-4c1b.up.railway.app/'
      ).subscribe({ error: () => {} });
    }, 2500);
  }
}