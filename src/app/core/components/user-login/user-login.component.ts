import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl:'user-login.component.html',
  styleUrls: ['user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  invalidLogin = false;
  errorMessage = '';
  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
  });
  get f() {
    return this.loginForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
