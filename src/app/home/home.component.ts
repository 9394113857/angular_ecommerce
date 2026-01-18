import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';

import { ProductService } from '../services/product.service';
import { RecommendationService } from '../services/recommendation.service';
import { products } from 'src/data.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // =========================
  // UI STATE
  // =========================
  isLoading = false;
  loadingText = 'Loading products...';

  // =========================
  // DATA
  // =========================
  productData?: products[];
  recommendedProducts: products[] = [];
  showRecommendations = false;

  // =========================
  // SLIDER
  // =========================
  nextFontIcon = faChevronLeft;
  prevFonticon = faChevronRight;

  popularProduct = [
    'https://my-shoping-frontend.vercel.app/static/media/slider-1.2.87b6e70aa5f62e364f8d.jpg',
    'https://my-shoping-frontend.vercel.app/static/media/slider-1.1.e60d4fc52cc2a1d111a7.jpg',
    'https://my-shoping-frontend.vercel.app/static/media/slider-2.1.9aa725195d5160024a1c.jpg'
  ];

  slidePosition = 0;
  autoplayInterval: any;

  constructor(
    private productService: ProductService,
    private recoService: RecommendationService,
    private titleService: Title
  ) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Home');
    this.startAutoplay();
    this.loadProducts();
    this.loadRecommendations();
  }

  // =========================
  // PRODUCTS
  // =========================
  loadProducts(): void {
    this.isLoading = true;

    this.productService.getProductList().subscribe(data => {
      this.productData = data;
      this.isLoading = false;
    });
  }

  // =========================
  // ML RECOMMENDATIONS
  // =========================
  loadRecommendations(): void {
    const userData = localStorage.getItem('userLoggedIn');
    if (!userData) return;

    const userId = JSON.parse(userData).id;

    this.recoService.getRecommendations(userId).subscribe(recos => {
      if (!recos.length || !this.productData) return;

      this.recommendedProducts = this.productData.filter(p =>
        recos.some(r => r.product_id === Number(p._id))
      );

      this.showRecommendations = this.recommendedProducts.length > 0;
    });
  }

  // =========================
  // SLIDER LOGIC
  // =========================
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
    }, 2000);
  }

  stopAutoplay(): void {
    clearInterval(this.autoplayInterval);
  }
}