import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { Role } from 'src/app/data/enums/role.enum';
import { SideNavItem } from 'src/app/data/models/sidenav-item.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { BlobService } from 'src/app/data/services/blob.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @Input()
  sideNavItems!: SideNavItem[];

  roleEnum = Role;
  role!: Role;
  sideBarVisibility = true;
  profilePictureSource: string='assets/defaultProfilePicture.png';
  userName!: string;
  email!: string;

  constructor(
    private profileService: BlobService,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorage
  ) { }

  ngOnInit(): void {
    this.getRole();
    this.getUserName();
    this.getEmail();
    this.getProfilePicture();
  }

  getUserName() {
    this.userName = this.authService.getUserName();
  }

  getRole() {
    this.role = this.authService.getRole();
  }

  getEmail() {
    this.email = this.authService.getEmail();
  }

  getProfilePicture() {
    this.profileService.getProfilePicture().subscribe({
      next: res => {
        if (res.url) {
          this.profilePictureSource = `${res.url}?${environment.profile_sas_token}`;
        }
      }
    });
  }

  toggleSideBar() {
    this.sideBarVisibility = !this.sideBarVisibility;
  }

  routeToProfile() {
    if (this.role == this.roleEnum.jobSeeker) {
      this.router.navigateByUrl(RouteConstants.jobSeekerProfile);
    } else if (this.role == this.roleEnum.employer)  {
      this.router.navigateByUrl(RouteConstants.employerProfile);
    }
  }

  routeToAccountSettings() {
    if (this.role == this.roleEnum.jobSeeker) {
      this.router.navigateByUrl(RouteConstants.jobSeekerAccountSettings);
    } else if (this.role == this.roleEnum.employer) {
      this.router.navigateByUrl(RouteConstants.employerAccountSettings);
    }
  }

  logout() {
    this.localStorage.removeItem('accessToken');
    if (this.role == Role.employer) {
      this.router.navigateByUrl(RouteConstants.employerLogin);
    } else if (this.role == Role.jobSeeker) {
      this.router.navigateByUrl(RouteConstants.jobSeekerLogin);
    }
  }

}
