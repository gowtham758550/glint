import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  next() {
    if (this.isVerified) {
      this.router.navigateByUrl('/job-seeker/signup/personal-information');
    } else {
      console.log(false);
    }
  }

  getVerificationStatus() {
    // console.log("vstatus");
    const email = this.localStorage.getItem('email');
    this.authService.isVerified(email)
      .subscribe({
        next: res => {
          if (this.role == 'Employer') this.router.navigateByUrl('/employer/signup/company-detail');
          else this.router.navigateByUrl('/job-seeker/signup/personal-information');
        }
      });
  }

}
