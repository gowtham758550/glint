import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SidebarItems } from "src/app/data/models/sidebar-items.model";
import { AuthService } from "src/app/data/services/auth.service";
import { BlobService } from "src/app/data/services/blob.service";
import { LocalStorage } from "src/app/data/services/local-storage.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  @Input()
  sidebarItems!: SidebarItems[];
  
  email!:string;
  userName!:string

  showSidebar: boolean = true;
  imageUrl: string="https://cdn-icons-png.flaticon.com/512/1077/1077012.png?w=360";

  constructor(
    private authService: AuthService,
    private profileService: BlobService,
    private router: Router,
    private localStorage: LocalStorage
  ) {}

  ngOnInit(): void {
    const jwtdata=this.localStorage.getItem('accessToken');
    this.userName = this.authService.getUserName(jwtdata);
    this.email=this.authService.getEmail(jwtdata)
    this.getProfilePicture();

  }

  toggleSidebarVisibility() {
    this.showSidebar = !this.showSidebar;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }

  getProfilePicture() {
    this.profileService.getProfilePicture().subscribe({
      next: (data: any) => {
        let res = data.url;
        this.imageUrl = res + "?" + environment.sas_token;
      },
    });
  }

  routeToProfile() {
    const accessToken = this.localStorage.getItem('accessToken');
    const role = this.authService.getRole(accessToken);
    if (role == 'JobSeeker') this.router.navigateByUrl('/job-seeker/profile');
    else if (role == 'Employer') this.router.navigateByUrl('/employer/profile');
  }
}
