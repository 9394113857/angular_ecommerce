import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { protectRouteGuard } from './protect-route.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"auth",
    component:AuthenticationComponent
  },

  {
    path:"seller-home",
    component:SellerHomeComponent,
    canActivate:[protectRouteGuard]
  },
  {
    path:"seller-add-product",
    component:SellerAddProductComponent,
    canActivate:[protectRouteGuard]
  },
  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent,
    canActivate:[protectRouteGuard]
  },
  {
    path:'search/:query',
    component:SearchComponent
  },
  {
    path:'product/details/:productId',
    component:ProductDetailsComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path:"checkout",
    component:CheckoutComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path:"**",
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
