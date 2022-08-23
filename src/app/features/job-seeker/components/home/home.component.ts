import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { SideNavItem } from 'src/app/data/models/sidenav-item.model';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  routeConstants = RouteConstants;
  sideNavItems: SideNavItem[] = [
    {
      label: 'Home',
      routeTo: this.routeConstants.jobSeekerHome,
      icon: 'pi-home'
    },
    {
      label: 'My Jobs',
      routeTo: this.routeConstants.jobSeekerMyJobs,
      icon: 'pi-briefcase'
    }
  ]
  sideBarVisibility = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.sideBarVisibility = !this.sideBarVisibility;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl(RouteConstants.jobSeekerLogin);
  }
  

}
