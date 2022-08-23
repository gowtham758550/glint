import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { Role } from 'src/app/data/enums/role.enum';

import { AuthService } from 'src/app/data/services/auth.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styles: [
  ]
})
export class VerifyComponent implements OnInit {

  @Input()
  role!: string;

  isVerified = false;
  email!: string;

  constructor(
    private router: Router,
    private localStorage: LocalStorage,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.email = this.localStorage.getItem('email');
  }

  getVerificationStatus() {
    this.spinner.show();
    const email = this.localStorage.getItem('email');
    this.authService.isVerified(email)
      .subscribe({
        next: res => {
          if (!res) {
            this.isVerified = true;
            this.toastr.success('Verified successfully');
            if (this.role == Role.employer) this.router.navigateByUrl(RouteConstants.employerCompanyDetails);
            else if (this.role == Role.jobSeeker) this.router.navigateByUrl(RouteConstants.jobSeekerPersonalInformation);
            this.spinner.hide();
          }
        },
      });
  }
  

}
