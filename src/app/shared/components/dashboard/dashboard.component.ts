import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SidebarItems } from 'src/app/data/models/sidebar-items.model';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  @Input()
  sidebarItems!: SidebarItems[]; 

  showSidebar: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleSidebarVisibility() {
    this.showSidebar = !this.showSidebar;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
