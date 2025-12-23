import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from '@angular/platform-browser'


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(
    private route:Router,
    private titleService:Title
    ){}

    
  ngOnInit() {
   
    this.titleService.setTitle("E-Comm | 404")
  }

  redirectToHome(){
    this.route.navigate(['/'])
  }
}
