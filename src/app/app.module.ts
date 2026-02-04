import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* COMPONENTS */
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
// import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SellerAddStockComponent } from './seller-add-stock/seller-add-stock.component';

import { ProductCardComponent } from './product-card/product-card.component';
// import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LoadingComponent } from './loading/loading.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/* ICONS */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/* SERVICES */
import { SharedService } from './services/shared.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    LoadingComponent,

    HomeComponent,
    AuthenticationComponent,
    LoginComponent,
    // SearchComponent,

    SellerHomeComponent,
    SellerAddProductComponent,
    SellerAddStockComponent,
    // SellerUpdateProductComponent,

    ProductCardComponent,
    ProductDetailsComponent,

    CartComponent,
    CheckoutComponent,

    OrdersComponent,
    OrderDetailsComponent,

    UnauthorizedComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}      
