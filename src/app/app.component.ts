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

  warmUpBackends() {

    this.http.get(
      'https://backend-product-service-ipnq.onrender.com/api/angularProduct/health'
    ).subscribe({ error: () => {} });

    setTimeout(() => {
      this.http.get(
        'https://backend-ml-events-service.onrender.com/'
      ).subscribe({ error: () => {} });
    }, 500);

    setTimeout(() => {
      this.http.get(
        'https://backend-auth-service-6zwi.onrender.com/api/v1/auth/'
      ).subscribe({ error: () => {} });
    }, 1000);

    setTimeout(() => {
      this.http.get(
        'https://backend-cart-order-service.onrender.com/'
      ).subscribe({ error: () => {} });
    }, 1500);
  }
}
