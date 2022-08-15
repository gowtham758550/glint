import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { FormField } from 'src/app/data/models/form-field.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { EmployerService } from 'src/app/data/services/employer.service';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-account-settings-employer',
  templateUrl: 'account-settings-employer.component.html',
  styleUrls: ['account-settings-employer.component.css']
})
export class AccountSettingsEmployerComponent implements OnInit {
  jwt: string = '';
  Email: string = '';
  emailForm!: FormGroup;
  currentPassword!: string;
  newPassword!: string;
  passwordObject: any;
  action!: string;
  editableId!: number;
  displayMaximizable!: boolean;
  showButton: boolean = true;

  emailFields: FormField[] = [
    {
      type: 'input',
      label: 'Email',
      formControlName: 'Email',
      class: ['w'],
    },
  ]

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private primengConfig: PrimeNGConfig,
    private employerService: EmployerService,
    private router: Router,
    private authService: AuthService,
    ) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.Email = this.authService.getEmail();
    console.log(this.Email)
    this.emailForm = this.formBuilder.group({
      Email: [this.Email, [Validators.required]],
    })
  }

  // --------------------------  change password --------------------------------------------

  changePassword(currentPassword: string, newPassword: string) {
    console.log(currentPassword, newPassword)
    this.passwordObject = { CurrentPassword: currentPassword, NewPassword: newPassword }
    this.employerService.changePassword(this.passwordObject).subscribe({
      next: () => {

        this.toastr.success('Password changed successfully', 'Success');
        this.authService.logout();
        this.router.navigateByUrl("/login");
      }
    });

  }
  onSubmit(password: any) {
    console.log(password.value)
  }
  checkNewPassword(newPassword: string) {
    console.log(newPassword);
    if (newPassword === this.currentPassword) {
      this.toastr.warning("Current Password and New Password cannot be same")
      this.showButton = false;
    }
    else if (newPassword === "" || this.currentPassword === "") {
      this.showButton = false;
    }
    else if (newPassword.length < 8) {

    }
    else {
      this.showButton = true;
    }
  }
  checkCurrentPassword(currentPassword: string) {
    console.log(this.newPassword)
    if (currentPassword === "" || this.newPassword === "") {
      this.showButton = false;
    }
    else if (currentPassword === this.newPassword) {
      this.toastr.warning("Current Password and New Password cannot be same")
      this.showButton = false;
    }
    else {
      this.showButton = true;
    }
  }

  // -----------------  Update email actions --------------------------------------------------

  updateEmail() {
    this.action = 'Update';
    const updatedEmail = this.emailForm.controls["Email"].value;
    this.employerService.changeEmail(updatedEmail)
      .subscribe({
        next: () => {
          this.toastr.success('Email updated. Verify your email and Login', 'Success');
          this.authService.logout();
          this.router.navigateByUrl("employer/login");
        }
      });
  }
  // ------------------------- Delete Profile dialog box -----------------------------//


  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  showtoastrmessage() {
    this.authService.deleteProfile().subscribe(res => console.log(res))
    this.displayMaximizable = false;
    this.authService.logout();
    this.toastr.success('Account deleted');
  }
  // --------------------------------------------------------------------------------//


}
