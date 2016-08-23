import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Http, ConnectionBackend} from '@angular/http';

@Component({
  selector: 'app',
  providers: [Http, ConnectionBackend],
  // encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app.css'],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {

  }
}
