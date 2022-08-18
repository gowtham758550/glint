import { Component, Input, OnInit } from '@angular/core';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';

@Component({
  selector: 'app-logo',
  template: `

    <ng-container *ngIf="variant == 'light'; then light; else dark">
    </ng-container>
    <ng-template #light>
      <h1 class="pointer text-dark"
        [routerLink]="routeConstants.landingPage">
        <span><i class="fs-3 text-orange pi pi-briefcase"></i></span>
        Gl<span class="text-orange">i</span>nt
      </h1>
    </ng-template>
    <ng-template #dark>
      <h1 class="pointer text-white"
        [routerLink]="routeConstants.landingPage">
        <span><i class="fs-3 text-white pi pi-briefcase"></i></span>
        Gl<span class="text-white">i</span>nt
      </h1>
    </ng-template>
  `,
  styles: [
  ]
})
export class LogoComponent implements OnInit {

  @Input()
  variant!: string;

  routeConstants = RouteConstants;

  constructor() { }

  ngOnInit(): void {
  }

}
