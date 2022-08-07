import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { FormField } from 'src/app/data/models/form-field.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    userName_or_Email: ['', [Validators.required]],
    password: ['', Validators.required]
  })
  loginFields: FormField[] = [
    {
      type: 'input',
      label: 'Username or Mail address',
      class: [],
      formControlName: 'userName_or_Email'
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
      routeTo: '/forgot-password'
    },
    {
      type: 'submit',
      label: 'Login',
      class: [],
    },
    {
      type: 'anchor',
      label: 'New to Glint? Create an account',
      class: ['pt-3', 'text-center'],
      routeTo: '/job-seeker/signup'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorage,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  recieveFormData() {
    this.login(this.loginForm.value);
  }

  login(credentials: object) {
    this.authService.login(credentials).subscribe({
      next: data => {
        this.toastr.success('Logged in successfully');
        const dataObject = JSON.parse(JSON.stringify(data));
        this.localStorage.setItem('accessToken', dataObject.jwt);
        const role = this.authService.getRole(dataObject.jwt);
        if (role == 'JobSeeker') this.router.navigateByUrl('/job-seeker/dashboard');
        else if (role == 'Employer') this.router.navigateByUrl('/employer/dashboard');
      }
    });
  }

}
