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

  isLoading = false;
  loadingText = 'Loading products...';

  productData: products[] = [];
  recommendedProducts: products[] = [];
  showRecommendations = false;

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

  ngOnInit(): void {
    this.titleService.setTitle('E-Comm | Home');
    this.startAutoplay();
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
        recos.some(r => r.product_id === p.id)
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

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.nextSlide(), 2000);
  }
}
