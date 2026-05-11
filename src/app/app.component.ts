import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  SimpleStatusService
} from './services/simple-status.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  currentStatus:
    'checking' |
    'almost' |
    'finalizing' |
    'ready' = 'checking';


  constructor(
    private http: HttpClient,
    private status: SimpleStatusService
  ) {}


  ngOnInit(): void {

    this.status.status$.subscribe(status => {

      this.currentStatus = status;
    });

    this.warmUpBackends();
  }


  // =====================================================
  // BACKEND WARMUP
  // =====================================================

  warmUpBackends(): void {

    this.status.setStatus('checking');

    const urls = [

      // AUTH SERVICE
      'http://127.0.0.1:5000/',

      // PRODUCT SERVICE
      'https://backend-product-service-ncl2.onrender.com',

      // CART SERVICE
      'https://backend-cart-order-service-q6qh.onrender.com',

      // ML EVENTS SERVICE
      'https://backend-ml-events-service-ba9v.onrender.com',

      // ML RECOMMENDATION SERVICE
      'https://backend-ml-recommendation-service-huu6.onrender.com'
    ];

    let completed = 0;

    urls.forEach((url, index) => {

      setTimeout(() => {

        this.http.get(url).subscribe({

          next: () => {

            completed++;

            this.updateStatus(
              completed,
              urls.length
            );
          },

          error: () => {

            completed++;

            this.updateStatus(
              completed,
              urls.length
            );
          }

        });

      }, index * 400);

    });
  }


  // =====================================================
  // STATUS UPDATE LOGIC
  // =====================================================

  updateStatus(
    completed: number,
    total: number
  ): void {

    // 🟡 HALF READY

    if (completed >= total / 2) {

      this.status.setStatus('almost');
    }

    // 🟢 ALL READY

    if (completed === total) {

      this.status.setStatus('finalizing');

      setTimeout(() => {

        this.status.setStatus('ready');

      }, 1200);
    }
  }

}