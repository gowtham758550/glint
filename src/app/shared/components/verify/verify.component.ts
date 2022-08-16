import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ) { }

  ngOnInit(): void {
    this.email = this.localStorage.getItem('email');
    setTimeout(this.getVerificationStatus, 1000);
  }

  getVerificationStatus() {
    // console.log("vstatus");
    const email = this.localStorage.getItem('email');
    this.authService.isVerified(email)
      .subscribe({
        next: res => {
          this.isVerified = true;
          if (this.role == Role.employer) this.router.navigateByUrl('/employer/signup/company-detail');
          else if (this.role == Role.jobSeeker) this.router.navigateByUrl('/job-seeker/signup/personal-information');
        }
      });
  }

}
