import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {

  isLoading = false;
  loadingText = 'Loading products...';

  productData: Product[] = [];
  recommendedProducts: Product[] = [];
  showRecommendations = false;

  nextFontIcon = faChevronLeft;
  prevFonticon = faChevronRight;

  // ✅ SLIDER FIX
  slidePosition = 0;
  popularProduct = [
    'https://my-shoping-frontend.vercel.app/static/media/slider-1.2.jpg',
    'https://my-shoping-frontend.vercel.app/static/media/slider-2.1.jpg',
    'https://my-shoping-frontend.vercel.app/static/media/slider-3.1.jpg'
  ];

  constructor(
    private productService: ProductService,
    private recoService: RecommendationService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Home');
    this.loadProducts();
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

  previousSlide() {
    this.slidePosition =
      this.slidePosition === 0
        ? (this.popularProduct.length - 1) * -100
        : this.slidePosition + 100;
  }

  nextSlide() {
    this.slidePosition =
      this.slidePosition === (this.popularProduct.length - 1) * -100
        ? 0
        : this.slidePosition - 100;
  }
}
