import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormField } from 'src/app/data/models/form-field.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  registerationForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })
  registerationFields: FormField[] = [
    {
      type: 'input',
      label: 'First Name',
      formControlName: 'firstName',
      class: ['w']
    },
    {
      type: 'input',
      label: 'Last Name',
      formControlName: 'lastName',
      class: ['w']
    },
    {
      type: 'input',
      label: 'Username',
      formControlName: 'userName',
      class: ['w']
    },
    {
      type: 'email',
      label: 'Email address',
      formControlName: 'email',
      class: ['w']
    },
    {
      type: 'password',
      label: 'Password',
      formControlName: 'password',
      class: ['w']
    },
    {
      type: 'password',
      label: 'Confirm password',
      formControlName: 'confirmPassword',
      class: ['w']
    },
    {
      type: 'submit',
      label: 'Next',
      class: ['d-flex justify-content-end']
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorage
  ) { }

  ngOnInit(): void {
  }

  receiveFormData() {
    console.log(this.registerationForm.value);
    this.authService.signup({...this.registerationForm.value, ...{authRole: "JobSeeker"}})
      .subscribe({
        next: () => {
          this.localStorage.setItem('email', this.registerationForm.controls['email'].value);
          this.localStorage.setItem('firstName', this.registerationForm.controls['firstName'].value);
          this.localStorage.setItem('lastName', this.registerationForm.controls['lastName'].value);
          this.router.navigateByUrl('/job-seeker/signup/verify-account')
        },
        error: err => console.log(err)
      });
    
  }
}
