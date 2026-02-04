import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../services/shared.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() productData: any;
  viewdet = faEye;
  faEditIcon = faEdit;
  isSellerLoggedIn: boolean = false



  constructor(
    private route: Router,
    private sharedService: SharedService,
    private eventTracking: EventTrackingService
    
  ) { }

  ngOnInit(): void {
    this.sharedService.isSellerLoggedIn$.subscribe((val: boolean) => {
      this.isSellerLoggedIn = val;
    });

  if (this.productData?.id) {
    this.eventTracking.trackEvent({
      event_type: 'view_product',
      object_type: 'product',
      object_id: this.productData.id?.toString()
    });
  }
}


  redirectProductDetails(id: number | undefined) {
  if (!id) {
    console.error('Product ID missing');
    return;
  }
  this.route.navigate([`product/details/${id}`]);

  this.eventTracking.trackEvent({
  event_type: 'product_clicked',
  object_type: 'product',
  object_id: id?.toString()
});


}// end redirectProductDetails

EditRedirect(id: number | undefined) {
  if (!id) {
    console.error('Product ID missing');
    return;
  }
  this.route.navigate([`seller-update-product/${id}`]);

  this.eventTracking.trackEvent({
  event_type: 'seller_edit_product_click',
  object_type: 'product',
  object_id: id?.toString()
});

}// end EditRedirect

}// end class

// ==============================================================


// This is a VERY IMPORTANT comment for all developers working on this project.
// So _id and id main difference is whats going on the backend is explained here:

// 🧠 IMPORTANT RULE (REMEMBER THIS FOREVER)
// Flask / SQL backend:
// id

// Mongo backend:
// _id


// 🚫 Never mix them

// Your Angular app was half Mongo, half SQL — now it’s clean.
