import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,      // 🔥 THIS FIXES date pipe
    RouterModule
  ]
})
export class OrdersModule {}
