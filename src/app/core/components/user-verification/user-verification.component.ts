import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerificationService } from '../../services/verification.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styles: [
  ]
})
export class UserVerificationComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private verificationService: VerificationService,
  ) { }

  ngOnInit(): void {
    const token = this.getToken();
    console.log(token);
    if (token) {
      this.verifyWithToken(token);

    } else {
      console.log('no token');
    }
  }

  getToken() {
    let params: any = {};
    this.activatedRoute.queryParams.subscribe({
      next: data => params = data
    })
    return params.token;
  }

  verifyWithToken(token: string) {
    this.verificationService.verifyWithToken(token).subscribe({
      next: data => console.log(data)
    });
  }

}
