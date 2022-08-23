import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { AccessToken } from 'src/app/data/models/access-token.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  @Input()
  role!: string;

  registerationForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, 
      Validators.minLength(8) , 
      Validators.pattern(new RegExp("(?=.*[0-9])")),
      Validators.pattern(new RegExp("(?=.*[A-Z])")),
      Validators.pattern(new RegExp("(?=.*[a-z])"))]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  },
    { validator: this.passwordValidator }
  );


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorage,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  receiveFormData() {
    this.spinner.show();
    this.authService.signup({ ...this.registerationForm.value, ...{ authRole: this.role } })
      .subscribe({
        next: (data: AccessToken) => {
          this.localStorage.setItem('email', this.registerationForm.controls['email'].value);
          this.localStorage.setItem('firstName', this.registerationForm.controls['firstName'].value);
          this.localStorage.setItem('lastName', this.registerationForm.controls['lastName'].value);
          if (this.role == 'JobSeeker') this.router.navigateByUrl('/job-seeker/signup/verify-account');
          else this.router.navigateByUrl('/employer/signup/verify-account');
          this.localStorage.setItem('accessToken', data.jwt);
          this.spinner.hide();
        }
      });
  }

  passwordValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }
}
