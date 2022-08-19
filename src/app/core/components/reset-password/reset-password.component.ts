import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormField } from 'src/app/data/models/form-field.model';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [
  ]
})
export class ResetPasswordComponent implements OnInit {
  
  validateOTPForm: FormGroup = this.formBuilder.group({
    otp: ['', [Validators.required, Validators.maxLength(6)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  },
  { Validator: this.passwordValidator }
  );
  validateOTPField: FormField[] = [
    {
      type: 'input',
      label: 'OTP',
      formControlName: 'otp',
      class: ['']
    },
    {
      type: 'password',
      label: 'New password',
      formControlName: 'password',
      class: []
    },
    {
      type: 'password',
      label: 'Confirm password',
      formControlName: 'confirmPassword',
      class: []
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  passwordValidator(form: FormGroup) {
      return form.controls['password'].value === form.controls['confirmPassword'].value ? null : {'mismatch': true};
  }
  
  submit() {
    this.validateOTP();
  }

  validateOTP() {
    this.spinner.show();
    const formValue = this.validateOTPForm.value;
    this.authService.resetPassword(formValue).subscribe({
      next: () => {
        this.toastr.success('Password changed successfully', 'Success');
        setTimeout(() => this.router.navigateByUrl('/login'), 1000);
        this.spinner.hide();
      },
    });
  }

}
