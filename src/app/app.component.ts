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
   * ---------------------------------------------
   * Render Cold-Start Warmup
   * ---------------------------------------------
   * Purpose:
   * - Trigger all backend services once on app load
   * - Avoid long cold-start delays during real user actions
   * - Errors are intentionally ignored
   */
  warmUpBackends(): void {

    // ---------------------------------------------
    // Product Service
    // ---------------------------------------------
    this.http.get(
      'https://backend-product-service-ipnq.onrender.com/api/angularProduct/health'
    ).subscribe({ error: () => {} });

    // ---------------------------------------------
    // ML Events Service
    // ---------------------------------------------
    setTimeout(() => {
      this.http.get(
        'https://backend-ml-events-service.onrender.com/'
      ).subscribe({ error: () => {} });
    }, 500);

    // ---------------------------------------------
    // Auth Service
    // ---------------------------------------------
    setTimeout(() => {
      this.http.get(
        'https://backend-auth-service-6zwi.onrender.com/api/v1/auth/'
      ).subscribe({ error: () => {} });
    }, 1000);

    // ---------------------------------------------
    // Cart / Order Service
    // ---------------------------------------------
    setTimeout(() => {
      this.http.get(
        'https://backend-cart-order-service.onrender.com/'
      ).subscribe({ error: () => {} });
    }, 1500);

    // ---------------------------------------------
    // ML Recommendation Service (NEW)
    // ---------------------------------------------
    setTimeout(() => {
      this.http.get(
        'https://backend-ml-recommendation-service.onrender.com/'
      ).subscribe({ error: () => {} });
    }, 2000);
  }
}
