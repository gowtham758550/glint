import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormField } from 'src/app/data/models/form-field.model';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  })
  forgotPasswordField: FormField[] = [
    {
      type: 'title',
      label: 'Forgot password',
      class: ['fw-bold fs-3'],
    },
    {
      type: 'email',
      label: 'Mail address',
      formControlName: 'email',
      class: []
    },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.sendOTP();
  }

  sendOTP() {
    this.spinner.show();
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/reset-password');
        this.spinner.hide();
      }
    });
  }

}
