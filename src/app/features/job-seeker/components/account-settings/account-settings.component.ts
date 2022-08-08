import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { FormField } from 'src/app/data/models/form-field.model';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  emailForm: FormGroup = this.formBuilder.group({

    Email: ['deepikaa@gmail.com', [Validators.required]],
  })
  emailFields: FormField[] = [
    {
      type: 'input',
      label: 'Email',
      formControlName: 'Email',
      class: ['w'],
    },
  ]
  currentPassword!: string;
  newPassword!: string;
  passwordObject: any;
  changePassword(currentPassword: string, newPassword: string) {
    console.log(currentPassword, newPassword)
    this.passwordObject = { CurrentPassword: currentPassword, NewPassword: newPassword }
    this.jobseekerservice.changePassword(this.passwordObject).subscribe({
      next: () => {

        this.toastr.success('Password changed successfully', 'Success');
        setTimeout(() => this.router.navigateByUrl('job-seeker/signup'), 1000);
      }
    });
  }

  // -----------------  Update email actions -------------------
  action!: string;
  editableId!: number;

  updateEmail(ref: any) {
    // this.jobSeekerService.updateProfile(this.profileForm.value)
    //   .subscribe({
    //     next: res => console.log(res)
    //   });
    this.action = 'Update';
    console.log(this.action);
    this.modalService.open(ref).result.then((result) => { })
  }
  executeEmailAction() {
    if (this.action == 'Update') {
      this.toastr.success('Email updated', 'Success');
    }
    this.modalService.dismissAll();
  }
  // ------------------------- Delete Profile dialog box -----------------------------//

  displayMaximizable!: boolean;
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  showtoastrmessage() {
    this.displayMaximizable = false;
    this.toastr.success('Account deleted', 'Success');
  }
  // --------------------------------------------------------------------------------//

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private primengConfig: PrimeNGConfig,
    private jobseekerservice: JobSeekerService,
    private router: Router) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
