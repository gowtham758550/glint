import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit, AfterContentChecked {

  visibility: boolean = false;
  title = 'glint';
  isLoading!: Subject<boolean>;
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
    },
    {
      value: 'user-verification',
      routeTo: '/user-verification'
    }
  ]
  class = {
    blur: this.isLoading
  }

  constructor(
    private loaderService: LoaderService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.isLoading = this.loaderService.isLoading;
  }

  ngAfterContentChecked(): void {
    // this.changeDetector.detectChanges();
  }
}
