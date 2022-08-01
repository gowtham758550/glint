import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/data/models/form-field.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    usernameOrMailAddress: ['', [Validators.required]],
    password: ['', Validators.required]
  })
  loginFields: FormField[] = [
    {
      type: 'input',
      label: 'Username or Mail address',
      class: [],
      formControlName: 'usernameOrMailAddress'
    },
    {
      type: 'password',
      label: 'Password',
      class: [],
      formControlName: 'password'
    },
    {
      type: 'anchor',
      label: 'Forgot password',
      class: ['text-end'],
    },
    {
      type: 'submit',
      label: 'Login',
      class: ['bg-primary', 'w-100'],
    },
    {
      type: 'anchor',
      label: 'New to Glint? Create an account',
      class: ['pt-3', 'text-center'],
      routeTo: '/job-seeker/signup'
    }
  ]

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  recieveFormData() {
    console.log(this.loginForm.value);
  }

}
