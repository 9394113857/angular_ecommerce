import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';

import { SellerAddStockComponent } from './seller-add-stock/seller-add-stock.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

import { protectRouteGuard } from './protect-route.guard';

// NEW AUTH COMPONENTS
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  // ---------------- HOME ----------------
  {
    path: '',
    component: HomeComponent
  },

  // ---------------- AUTH ----------------
  {
    path: 'auth',
    component: AuthenticationComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },

  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [protectRouteGuard]
  },

  // ---------------- SELLER ----------------
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [protectRouteGuard]
  },

  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [protectRouteGuard]
  },

  {
    path: 'seller-add-stock/:id',
    component: SellerAddStockComponent,
    canActivate: [protectRouteGuard]
  },

  // ---------------- PRODUCTS ----------------
  {
    path: 'product/details/:productId',
    component: ProductDetailsComponent
  },

  // ---------------- CART ----------------
  {
    path: 'cart',
    component: CartComponent
  },

  // ---------------- CHECKOUT ----------------
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [protectRouteGuard]
  },

  // ---------------- ORDERS ----------------
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [protectRouteGuard]
  },

  {
    path: 'orders/:orderId',
    component: OrderDetailsComponent,
    canActivate: [protectRouteGuard]
  },

  // ---------------- SYSTEM ----------------
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },

  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}