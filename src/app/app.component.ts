import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'e-commerce';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.warmUpBackends();
  }

  /**
   * 🔥 Render + Neon Cold Start Warmup
   * Runs ONCE when Angular app loads
   * Silent background calls (no UI impact)
   */
  warmUpBackends() {

    // 1️⃣ Product Service
    this.http.get(
      'https://backend-product-service-ipnq.onrender.com/api/angularProduct/health'
    ).subscribe({
      next: () => console.log('✅ Product service warmed'),
      error: () => {}
    });

    // 2️⃣ ML Events Service
    setTimeout(() => {
      this.http.get(
        'https://backend-ml-events-service.onrender.com/'
      ).subscribe({
        next: () => console.log('✅ ML events service warmed'),
        error: () => {}
      });
    }, 500);

    // 3️⃣ Auth Service
    setTimeout(() => {
      this.http.get(
        'https://backend-auth-service-6zwi.onrender.com/api/v1/auth/'
      ).subscribe({
        next: () => console.log('✅ Auth service warmed'),
        error: () => {}
      });
    }, 1000);

    // 4️⃣ Cart Service
    setTimeout(() => {
      this.http.get(
        'https://backend-cart-order-service.onrender.com/'
      ).subscribe({
        next: () => console.log('✅ Cart service warmed'),
        error: () => {}
      });
    }, 1500);
  }
}
