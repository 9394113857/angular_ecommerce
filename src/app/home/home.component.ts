import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {Title} from '@angular/platform-browser'
import { ProductService } from '../services/product.service';
import { products } from 'src/data.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  // loading 
  isLoading: boolean = false;
  loadingText: string = 'Loading products...';
  // data
  productData: undefined | products[]

  // icons
  nextFontIcon = faChevronLeft
  prevFonticon = faChevronRight




  constructor(
    private product: ProductService,
    private titleService:Title
  ) { }


  popularProduct = [
    "https://my-shoping-frontend.vercel.app/static/media/slider-1.2.87b6e70aa5f62e364f8d.jpg",
    "https://my-shoping-frontend.vercel.app/static/media/slider-1.1.e60d4fc52cc2a1d111a7.jpg",
    "https://my-shoping-frontend.vercel.app/static/media/slider-2.1.9aa725195d5160024a1c.jpg"
  ];
  slidePosition = 0;
  autoplayInterval: any;

  ngOnInit() {
    this.startAutoplay();
    this.getProductList();
    this.titleService.setTitle("E-Comm | Home")
  }

  // fetching or calling fetch functioin which is defined 
  // in side product services
  getProductList() {
    this.isLoading = true
    this.product.getProductList().subscribe(data => {
      if (data) {
        this.productData = data
        this.isLoading = false
      }
    })
  }


  // carousal function ⬇️

  previousSlide() {
    if (this.slidePosition === 0) {
      this.slidePosition = (this.popularProduct.length - 1) * -100;
    } else {
      this.slidePosition += 100;
    }
  }

  nextSlide() {
    if (this.slidePosition === (this.popularProduct.length - 1) * -100) {
      this.slidePosition = 0;
    } else {
      this.slidePosition -= 100;
    }
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }


}
