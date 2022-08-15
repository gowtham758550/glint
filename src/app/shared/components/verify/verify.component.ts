import { Component, OnInit } from '@angular/core';
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

  isVerified = false;
  email!: string;

  constructor(
    private router: Router,
    private localStorage: LocalStorage,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.email = this.localStorage.getItem('email');
    // this.getVerificationStatus();
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
    this.authService.isVerifed(this.localStorage.getItem('email'))
      .subscribe({
        next: res => this.router.navigateByUrl('/job-seeker/signup/personal-information')
      });
  }

}
