import { Component } from '@angular/core';

interface Route {
  value: string,
  routeTo: string
}

@Component({
  selector: 'app-root',
  template: `

    <ng-container *ngFor="let route of routes">
      <a [routerLink]="route.routeTo"
        class="px-2">
        {{route.value}}
      </a>
    </ng-container>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'glint';
  routes: Route[] = [
    {
      value: 'landing page',
      routeTo: '/'
    },
    {
      value: 'login',
      routeTo: '/login'
    },
    {
      value: 'signup 1',
      routeTo: '/employer/signup'
    },
    {
      value: 'signup 2',
      routeTo: '/job-seeker/signup'
    },
    {
      value: 'dashboard 1',
      routeTo: '/employer/dashboard'
    },
    {
      value: 'dashboard 1',
      routeTo: '/job-seeker/dashboard'
    }
  ]
}
