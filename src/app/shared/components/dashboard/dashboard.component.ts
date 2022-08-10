import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SidebarItems } from "src/app/data/models/sidebar-items.model";
import { AuthService } from "src/app/data/services/auth.service";
import { BlobService } from "src/app/data/services/blob.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  @Input()
  sidebarItems!: SidebarItems[];
  

  showSidebar: boolean = true;
  imageUrl!: string;

  constructor(
    private authService: AuthService,
    private profileService: BlobService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
}
