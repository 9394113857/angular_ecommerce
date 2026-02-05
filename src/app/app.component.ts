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
   * 🚀 Render Cold-Start Warmup (ORDERED FLOW)
   * =====================================================
   * Order:
   * 1️⃣ Auth Service
   * 2️⃣ Product Service
   * 3️⃣ Cart / Order Service
   * 4️⃣ ML Events Service
   * 5️⃣ ML Recommendation Service
   *
   * Purpose:
   * - Wake Render containers on app load
   * - Avoid cold-start delays for real users
   * - Errors are intentionally ignored
   */
  warmUpBackends(): void {

    // ---------------------------------------------
    // 🔐 1) Auth Service
    // ---------------------------------------------
    this.http.get(
      'https://backend-auth-service-6zwi.onrender.com/api/v1/auth/'
    ).subscribe({ error: () => {} });

    // ---------------------------------------------
    // 📦 2) Product Service
    // ---------------------------------------------
    setTimeout(() => {
      this.http.get(
        'https://backend-product-service-ipnq.onrender.com/api/angularProduct/health'
      ).subscribe({ error: () => {} });
    }, 500);

    // ---------------------------------------------
    // 🛒 3) Cart / Order Service
    // ---------------------------------------------
    setTimeout(() => {
      this.http.get(
        'https://backend-cart-order-service.onrender.com/'
      ).subscribe({ error: () => {} });
    }, 1000);

    // ---------------------------------------------
    // 📊 4) ML Events Service
    // ---------------------------------------------
    setTimeout(() => {
      this.http.get(
        'https://backend-ml-events-service.onrender.com/'
      ).subscribe({ error: () => {} });
    }, 1500);

    // ---------------------------------------------
    // 🤖 5) ML Recommendation Service
    // ---------------------------------------------
    setTimeout(() => {
      this.http.get(
        'https://backend-ml-recommendation-service.onrender.com/'
      ).subscribe({ error: () => {} });
    }, 2000);
  }
}
