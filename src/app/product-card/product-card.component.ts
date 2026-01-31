import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../services/shared.service';
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
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.isSellerLoggedIn$.subscribe((val: boolean) => {
      this.isSellerLoggedIn = val;
    });
  }


  redirectProductDetails(id: number | undefined) {
  if (!id) {
    console.error('Product ID missing');
    return;
  }
  this.route.navigate([`product/details/${id}`]);
}

EditRedirect(id: number | undefined) {
  if (!id) {
    console.error('Product ID missing');
    return;
  }
  this.route.navigate([`seller-update-product/${id}`]);
}

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
