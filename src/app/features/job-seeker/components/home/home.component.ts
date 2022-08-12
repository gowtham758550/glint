import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarItems } from 'src/app/data/models/sidebar-items.model';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  // sidebarItems: SidebarItems[] = [
  //   {
  //     type: 'menu-item',
  //     label: 'Dashboard',
  //     routeTo: '/job-seeker/dashboard',
  //     icon: 'pi-search'
  //   },
  //   {
  //     type: 'menu-item',
  //     label: 'My Jobs',
  //     routeTo: '/job-seeker/my-jobs',
  //     icon: 'pi-briefcase'
  //   }
  // ]
  sideBarVisibility = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.sideBarVisibility = !this.sideBarVisibility;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  

}
