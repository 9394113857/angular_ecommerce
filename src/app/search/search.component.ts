import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { products } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  paramsQue: string = '';
  productData: products[] | undefined;
  noDataFoundMessage: string = '';
  isLoading: boolean = false; 
  loadingText: string = 'Loading search results...';
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Search-Results');
    this.activeRoute.params.subscribe(params => {
      const paramsQuery = params['query'];

      if (paramsQuery !== null && paramsQuery !== undefined) {
        this.paramsQue = paramsQuery;
        this.isLoading = true; 

        this.productService.searchProducts(paramsQuery).subscribe((data: null | products[]) => {
          if (data && data.length > 0) {
            this.productData = data;
            this.noDataFoundMessage = '';
          } else {
            this.noDataFoundMessage = 'Data not found with search term';
            this.productData = [];
          }

          this.isLoading = false; 
        });
      }
    });
  }
}
