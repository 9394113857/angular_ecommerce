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
   * - Wake Render containers on app load
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
        'https://backend-cart-order-service.onrender.com'
      ).subscribe({ error: () => {} });
    }, 1000);

    // 📊 4) ML Events Service
    setTimeout(() => {
      this.http.get(
        'https://backend-ml-events-service.onrender.com'
      ).subscribe({ error: () => {} });
    }, 1500);

    // 🤖 5) ML Recommendation Service
    setTimeout(() => {
      this.http.get(
        'https://backend-ml-recommendation-service.onrender.com'
      ).subscribe({ error: () => {} });
    }, 2000);
  }
}


// ✅ How to Check Backend Warm-Up in Browser
// 1️⃣ Open your Angular app in the browser
//    → http://localhost:4200   (or your deployed frontend URL)

// 2️⃣ Open Developer Tools
//    → Press F12
//    → OR Right-click anywhere → Inspect

// 3️⃣ Go to the "Network" tab (top menu in DevTools)

// 4️⃣ Click the "Fetch / XHR" filter
//    → This shows only API calls

// 5️⃣ HARD REFRESH the page
//    → Press Ctrl + R
//    → OR Ctrl + Shift + R (best)

// 6️⃣ Watch the Network list immediately
//    → You should see these requests appear in order:

//       backend-auth-service-6zwi.onrender.com
//       backend-product-service-ipnq.onrender.com
//       backend-cart-order-service.onrender.com
//       backend-ml-events-service.onrender.com
//       backend-ml-recommendation-service.onrender.com

// 7️⃣ Click any one request
//    → Open the "Headers" tab
//    → Check:
//         - Request URL  ✅ correct base URL
//         - Status       ✅ 200 / 404 / 502 (ALL OK)

// 8️⃣ IMPORTANT:
//    → Even if Status = 404 / 401 / 502
//    → Backend is STILL warmed
//    → Render container is awake now

// 9️⃣ Final confirmation
//    → Perform a real action (login / load products)
//    → Response should be FAST (no cold delay)
