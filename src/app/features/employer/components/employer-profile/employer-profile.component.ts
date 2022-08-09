import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators, FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormField } from 'src/app/data/models/form-field.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { EmployerService } from 'src/app/data/services/employer.service';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-employer-profile',
  templateUrl: 'employer-profile.component.html',
  styles: [
  ]
})
export class EmployerProfileComponent implements OnInit {
  profileForm!: FormGroup;
  jobSeekerArray: any = [];
  email!:string;
  accessToken = this.localStorage.getItem('accessToken');
  profileFields: FormField[] = [
    {
      type: 'input',
      label: 'companyName',
      formControlName: 'companyName',
      class: ['w'],
    },
    {
      type: 'input',
      label: 'First Name',
      formControlName: 'firstName',
      class: ['w'],
    },
    {
      type: 'input',
      label: 'Last Name',
      formControlName: 'lastName',
      class: ['w'],
    },
    {
      type: 'input',
      label: 'Contact Number',
      formControlName: 'contactNumber',
      class: ['w'],
    },
    {
      type: 'date',
      label: 'Date Of Birth',
      formControlName: 'dateOfBirth',
      class: ['w']
    },
    {
      type: 'input',
      label: 'About',
      formControlName: 'about',
      class: ['w'],
    },]
  action!: string;
  jobSeekerProfile: any;
  updateProfile(ref: any) {
    this.action = 'Update';
    console.log(this.action);
    this.modalService.open(ref).result.then((result) => { })
  }
  executeProfileAction() {
    if (this.action == 'Update') {
      console.log(this.profileForm.value);
      this.employerService.updateProfile(this.profileForm.value).subscribe(res => {
        console.log(res);
        this.getEmployer();
      });

      this.toastr.success('Profile updated', 'Success');
    }
    this.modalService.dismissAll();
  }
  getEmployer() {
    this.employerService.getEmployerById().subscribe((res: any) => {
        console.log(res)
        this.jobSeekerArray = res
      });
  }
  employerProfile() {
    this.employerService.getEmployerById().subscribe((res:any)=>
      {
        console.log(res);
        this.jobSeekerArray = res;
        console.log(this.jobSeekerArray);
        this.jobSeekerProfile = res;
        this.profileForm = this.formBuilder.group({
          companyName: [res.companyName, [Validators.required]],
          firstName: [res.firstName, [Validators.required]],
          lastName: [res.lastName, [Validators.required]],
          contactNumber: [res.contactNumber, [Validators.required]],
          dateOfBirth: [formatDate(res.dateOfBirth, 'yyyy-MM-dd', 'en')],
          about: [res.about, [Validators.required]],
        });
      })
  }

  constructor(private modalService: NgbModal,
    private employerService: EmployerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private localStorage: LocalStorage,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.email = this.authService.getEmail(this.accessToken);
    this.employerProfile();
  }

}
