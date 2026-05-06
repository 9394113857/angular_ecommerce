// =========================
// Cell 1: Home Component (FINAL - NO EVENT TRACKING ✅)   
// =========================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { RecommendationService, Recommendation } from '../services/recommendation.service';
import { Product } from 'src/data.type';
import { SimpleStatusService, AppStatus } from '../services/simple-status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // =========================
  // UI STATE
  // =========================
  isLoading = false;
  loadingText = 'Loading products...';

  productData: Product[] = [];
  recommendedProducts: Product[] = [];
  showRecommendations = false;

  slidePosition = 0;
  appStatus: AppStatus = 'checking';

  // =========================
  // SLIDER IMAGES
  // =========================
  popularProduct: string[] = [
    'https://my-shoping-frontend.vercel.app/static/media/slider-1.2.87b6e70aa5f62e364f8d.jpg',
    'https://my-shoping-frontend.vercel.app/static/media/slider-1.1.e60d4fc52cc2a1d111a7.jpg',
    'https://my-shoping-frontend.vercel.app/static/media/slider-2.1.9aa725195d5160024a1c.jpg'
  ];

  nextFontIcon = faChevronRight;
  prevFonticon = faChevronLeft;

  private autoplayInterval: any;

  constructor(
    private productService: ProductService,
    private recoService: RecommendationService,
    private titleService: Title,
    private statusService: SimpleStatusService
  ) {}

  // =========================
  // INIT             
  // =========================
  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Home');

    // App status indicator
    this.statusService.status$.subscribe(s => {
      this.appStatus = s;
    });

    this.startAutoplay();
    this.loadProducts();

    // ❌ REMOVED ML EVENT TRACKING (INTENTIONAL)
  }

  ngOnDestroy(): void {
    clearInterval(this.autoplayInterval);
  }

  // =========================
  // SLIDER LOGIC
  // =========================
  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  previousSlide(): void {
    this.slidePosition =
      this.slidePosition === 0
        ? (this.popularProduct.length - 1) * -100
        : this.slidePosition + 100;
  }

  nextSlide(): void {
    this.slidePosition =
      this.slidePosition === (this.popularProduct.length - 1) * -100
        ? 0
        : this.slidePosition - 100;
  }

  // =========================
  // LOAD PRODUCTS FIRST
  // =========================
  loadProducts(): void {
    this.isLoading = true;

    this.productService.getProductList().subscribe({
      next: (data) => {
        console.log("🔥 PRODUCTS:", data);

        this.productData = data;
        this.isLoading = false;

        // AFTER PRODUCTS → LOAD RECOMMENDATIONS
        this.loadRecommendations();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // =========================
  // LOAD RECOMMENDATIONS
  // =========================
  loadRecommendations(): void {
    this.recoService.getRecommendations().subscribe({
      next: (recos: Recommendation[]) => {

        console.log("🔥 RECOS:", recos);

        if (!recos || recos.length === 0) {
          this.recommendedProducts = [];
          this.showRecommendations = false;
          return;
        }

        // SORT BY RANK
        recos.sort((a, b) => a.rank - b.rank);

        // FAST LOOKUP USING MAP
        const productMap = new Map(
          this.productData.map(p => [Number(p.id), p])
        );

        this.recommendedProducts = recos
          .map(r => productMap.get(Number(r.product_id)))
          .filter(p => !!p) as Product[];

        // LIMIT TOP 5 (OPTIONAL UI CONTROL)
        this.recommendedProducts = this.recommendedProducts.slice(0, 5);

        console.log("🔥 FINAL RECOMMENDED:", this.recommendedProducts);

        this.showRecommendations = this.recommendedProducts.length > 0;
      },
      error: () => {
        this.recommendedProducts = [];
        this.showRecommendations = false;
      }
    });
  }
}
