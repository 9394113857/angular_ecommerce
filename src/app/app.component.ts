import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SimpleStatusService } from './services/simple-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private status: SimpleStatusService
  ) {}

  ngOnInit(): void {
    this.warmUpBackends();
  }

  /**
   * =====================================================
   * 🚀 MULTI SERVICE WARMUP SYSTEM 
   * =====================================================
   */
  warmUpBackends(): void {

    // =====================================================
    // ✅ SERVICE URLS
    // =====================================================

    const services = [
      {
        name: 'Auth Service',
        url: 'https://backend-auth-service-ks6f.onrender.com'
      },
      {
        name: 'Product Service',
        url: 'https://backend-product-service-ncl2.onrender.com'
      },
      {
        name: 'Cart Service',
        url: 'https://backend-cart-order-service-q6qh.onrender.com'
      },
      {
        name: 'ML Events',
        url: 'https://backend-ml-events-service-ba9v.onrender.com'
      },
      {
        name: 'ML Recommendation',
        url: 'https://backend-ml-recommendation-service-huu6.onrender.com'
      }
    ];

    // =====================================================
    // ✅ CHECK SERVICES
    // =====================================================

    services.forEach((service, index) => {

      setTimeout(() => {

        this.http.get(service.url).subscribe({

          // 🟢 SUCCESS
          next: () => {

            this.status.updateServiceStatus(
              service.name,
              'up'
            );

          },

          // 🔴 FAILURE
          error: () => {

            this.status.updateServiceStatus(
              service.name,
              'down'
            );

          }

        });

      }, index * 500);

    });

  }
}