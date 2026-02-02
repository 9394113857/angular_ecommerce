import { Component, OnInit, OnDestroy } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { RecommendationService } from '../services/recommendation.service';
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
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Home');
    this.startAutoplay();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoplayInterval);
  }

  previousSlide(): void {
    if (this.slidePosition === 0) {
      this.slidePosition = (this.popularProduct.length - 1) * -100;
    } else {
      this.slidePosition += 100;
    }
  }

  nextSlide(): void {
    if (this.slidePosition === (this.popularProduct.length - 1) * -100) {
      this.slidePosition = 0;
    } else {
      this.slidePosition -= 100;
    }
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
      this.recommendedProducts = this.productData.filter(p =>
        recos.some((r: any) => r.product_id === p.id)
      );
      this.showRecommendations = this.recommendedProducts.length > 0;
    });
  }
}
