import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

interface Route {
  value: string,
  routeTo: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'glint';
  isLoading!: Subject<boolean>;
  a=true;
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
      value: 'dashboard 2',
      routeTo: '/job-seeker/dashboard'
    },
    {
      value: 'search 2',
      routeTo: '/search'
    }
  ]
  class = {
    blur: this.isLoading
  }

  constructor(
    private loaderService: LoaderService
  ) {
    console.log(this.loaderService.isLoading);
    this.isLoading = this.loaderService.isLoading;
  }
}
