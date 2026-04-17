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
   * 🚀 SIMPLE STATUS + WARMUP (FINAL)
   * =====================================================
   */
  warmUpBackends(): void {

    // 🔴 Step 1: Checking
    this.status.setStatus('checking');

    const urls = [
      'https://backend-auth-service-ks6f.onrender.com',
      'https://backend-product-service-ncl2.onrender.com',
      'https://backend-cart-order-service-q6qh.onrender.com',
      'https://backend-ml-events-service-ba9v.onrender.com',
      'https://backend-ml-recommendation-service-huu6.onrender.com',
      'https://assistant-service-production-4c1b.up.railway.app/'
    ];

    let completed = 0;

    urls.forEach((url, index) => {

      setTimeout(() => {
        this.http.get(url).subscribe({
          next: () => {
            completed++;

            // 🟡 Half done
            if (completed >= urls.length / 2) {
              this.status.setStatus('almost');
            }

            // 🟢 Final stage
            if (completed === urls.length) {
              this.status.setStatus('finalizing');

              setTimeout(() => {
                this.status.setStatus('ready'); // 🟢 DONE
              }, 800);
            }
          },
          error: () => {
            completed++;

            if (completed >= urls.length / 2) {
              this.status.setStatus('almost');
            }

            if (completed === urls.length) {
              this.status.setStatus('ready');
            }
          }
        });
      }, index * 400);

    });
  }
}