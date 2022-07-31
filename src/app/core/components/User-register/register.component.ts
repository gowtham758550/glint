import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl:'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  invalidRegister = false;
  errorMessage = '';
  registerForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
  },this.validatePassword('Password','ConfirmPassword'));
  validatePassword(Password:string, ConfirmPassword:string):any{
    return Password === ConfirmPassword ? null : {'mismatch': true};
  }


  get f() {
    return this.registerForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
