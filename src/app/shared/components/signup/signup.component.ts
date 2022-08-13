import { Component, Input, OnInit } from '@angular/core';
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
      hintMessage: 'Password should should be atleast 8 characters!',
      class: ['w']
    },
    {
      type: 'confirmPassword',
      label: 'Confirm password',
      hintMessage: 'Password mismatch!',
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
    this.authService.signup({ ...this.registerationForm.value, ...{ authRole: this.role } })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.localStorage.setItem('email', this.registerationForm.controls['email'].value);
          this.localStorage.setItem('firstName', this.registerationForm.controls['firstName'].value);
          this.localStorage.setItem('lastName', this.registerationForm.controls['lastName'].value);
          if (this.role == 'JobSeeker') this.router.navigateByUrl('/job-seeker/signup/verify-account');
          else this.router.navigateByUrl('/employer/signup/verify-account');
          this.localStorage.setItem('accessToken', data.jwt);
        },
        error: err => console.log(err)
      });
  }

  passwordValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }
}
