import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pages-home',
  templateUrl: 'pages/home/home.component.html',
  styleUrls: ['pages/home/home.component.css'],
  directives: [],
})
export class PagesHome {
  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    /*this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
      });*/
  }
 }
