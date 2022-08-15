import { Component, Input, OnInit } from '@angular/core';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';

@Component({
  selector: 'app-logo',
  template: `
    <h1 [ngClass]="class"
      class="pointer text-white"
      [routerLink]="routeConstants.landingPage">
      Gl<span class="text-warning">i</span>nt
      <span>
        <i class="pi pi-briefcase fs-3"
          [ngClass]="class">
        </i>
      </span>
    </h1>
  `,
  styles: [
  ]
})
export class LogoComponent implements OnInit {

  @Input()
  class!: string;

  routeConstants = RouteConstants;

  constructor() { }

  ngOnInit(): void {
  }

}
