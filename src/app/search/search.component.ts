import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { products } from 'src/data.type';
import { ProductService } from '../services/product.service';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  paramsQue = '';
  productData: products[] = [];
  noDataFoundMessage = '';
  isLoading = false;
  loadingText = 'Loading search results...';

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private titleService: Title,
    private eventTracker: EventTrackingService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Search');

    this.activeRoute.params.subscribe(params => {
      const query = params['query'];
      if (!query) return;

      this.paramsQue = query;
      this.isLoading = true;

      this.productService.searchProducts(query).subscribe(data => {
        this.productData = data || [];
        this.noDataFoundMessage = this.productData.length ? '' : 'No results found';

        // 📊 SEARCH EVENT
        this.eventTracker.trackEvent({
          event_type: 'search',
          metadata: {
            query,
            results_count: this.productData.length
          }
        });

        this.isLoading = false;
      });
    });
  }
}
