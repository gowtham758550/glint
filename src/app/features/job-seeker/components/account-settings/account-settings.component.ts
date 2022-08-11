import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { FormField } from 'src/app/data/models/form-field.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  jwt: string = '';
  Email: string = '';
  emailForm!: FormGroup;
  currentPassword!: string;
  newPassword!: string;
  passwordObject: any;
  action!: string;
  editableId!: number;
  displayMaximizable!: boolean;
  showButton=true;

  emailFields: FormField[] = [
    {
      type: 'input',
      label: 'Email',
      formControlName: 'Email',
      class: ['w'],
    },
  ]
  passwordForm: FormField[] = [
    {
      type: 'password',
      label: 'Current Password',
      formControlName: 'currentPassword',
      class: ['w'],
    },
    {
      type: 'password',
      label: 'New Password',
      formControlName: 'newPassword',
      class: ['w'],
    },
  ]

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private primengConfig: PrimeNGConfig,
    private jobseekerservice: JobSeekerService,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorage) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    const accessToken = this.localStorageService.getItem('accessToken');
    this.Email = this.authService.getEmail(accessToken);
    console.log(this.Email)
    this.emailForm = this.formBuilder.group({
      Email: [this.Email, [Validators.required]],
    })
  }

  // --------------------------  change password --------------------------------------------

  changePassword(currentPassword: string, newPassword: string) {
    console.log(currentPassword, newPassword)
    this.passwordObject = { CurrentPassword: currentPassword, NewPassword: newPassword }
    this.jobseekerservice.changePassword(this.passwordObject).subscribe({
      next: () => {

        this.toastr.success('Password changed successfully', 'Success');
        this.authService.logout();
        this.router.navigateByUrl("/login");
      }
    });

  }
  checkPassword(newPassword:string){
    if(newPassword!=undefined){
    if(newPassword=== this.currentPassword){
      this.toastr.warning("Current Password and New Password cannot be same")
      this.showButton=false;
    }
  }
  }
  // -----------------  Update email actions --------------------------------------------------

  updateEmail(ref: any) {
    this.action = 'Update';
    console.log(this.action);
    this.modalService.open(ref).result.then((result) => { })
  }
  executeEmailAction() {
    const updatedEmail = this.emailForm.controls["Email"].value;
    this.jobseekerservice.changeEmail(updatedEmail)
      .subscribe({
        next: () =>
          this.toastr.success('Email updated. Verify your email and Login', 'Success')
      });
    this.authService.logout();
    this.router.navigateByUrl("/login");
    this.modalService.dismissAll();
  }

  // ------------------------- Delete Profile dialog box -----------------------------//


  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  showtoastrmessage() {
    this.authService.deleteProfile().subscribe(res => console.log(res))
    this.displayMaximizable = false;
    this.toastr.success('Account deleted', 'Success');
  }
  // --------------------------------------------------------------------------------//


}
