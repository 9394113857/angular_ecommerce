import { Component, OnInit, OnDestroy } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { RecommendationService } from '../services/recommendation.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { Product } from 'src/data.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoading = false;
  loadingText = 'Loading products...';

  productData: Product[] = [];
  recommendedProducts: Product[] = [];
  showRecommendations = false;

  // SLIDER
  slidePosition = 0;

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
    private eventTracking: EventTrackingService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Home');
    this.startAutoplay();
    this.loadProducts();

  this.eventTracking.trackEvent({
  event_type: 'home_page_view'
});



}

  ngOnDestroy(): void {
    clearInterval(this.autoplayInterval);
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

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  loadProducts(): void {
    this.isLoading = true;

    this.productService.getProductList().subscribe(data => {
      this.productData = data;
      this.isLoading = false;

      this.loadRecommendations();
    });
  }

  loadRecommendations(): void {
    const user = localStorage.getItem('userLoggedIn');
    if (!user) return;

    const userId = JSON.parse(user).id;

    this.recoService.getRecommendations(userId).subscribe(recos => {
      this.eventTracking.trackEvent({
  event_type: 'recommendations_loaded'
});

      this.recommendedProducts = this.productData.filter(p =>
        recos.some((r: any) => r.product_id === p.id)
      );

      this.showRecommendations = this.recommendedProducts.length > 0;

      if (this.showRecommendations) {
        // 🔥 ML EVENT — RECOMMENDATIONS SHOWN
        this.eventTracking.trackEvent({
          event_type: 'recommendations_shown',
          object_type: 'product',
          metadata: {
            recommended_count: this.recommendedProducts.length
          }
        });
      }
    });

    


  }// laodRecommendations
}
