
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from '@angular/platform-browser'

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
  constructor(
    private router: Router,
    private titleService:Title
    ) {}
  ngOnInit(): void {

    this.titleService.setTitle("E-Comm | Unauthorized")
  }

  goHome(): void {
    this.router.navigate(['/']); 
  }
}
