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


  // redirect to product details page
  redirectProductDetails(id: Number) {
    this.route.navigate([`product/details/${id}`])
  }

  // if seller truet then below function will execute

  EditRedirect(id: number) {
    this.route.navigate([`seller-update-product/${id}`])
  }

}
