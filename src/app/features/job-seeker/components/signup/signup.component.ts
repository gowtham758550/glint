import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormField } from 'src/app/data/models/form-field.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  registerationForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })
  registerationFields: FormField[] = [
    {
      type: 'input',
      label: 'Username',
      formControlName: 'username',
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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  receiveFormData() {
    console.log(this.registerationForm.value);
    this.router.navigateByUrl('/job-seeker/signup/verify-account');
  }

}
