import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  paramsQue = '';
  productData: Product[] = [];
  noDataFoundMessage = '';
  isLoading = false;
  loadingText = 'Loading search results...';

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Search');

    this.activeRoute.params.subscribe(params => {
      const query = params['query'];
      if (!query) return;

      this.paramsQue = query;
      this.isLoading = true;

      this.productService.searchProducts(query).subscribe((data: Product[]) => {
        this.productData = data;
        this.noDataFoundMessage = data.length ? '' : 'No results found';
        this.isLoading = false;
      });
    });
  }
}
