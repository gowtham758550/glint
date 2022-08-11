import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormField } from 'src/app/data/models/form-field.model';
import { EmployerService } from 'src/app/data/services/employer.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styles: [
  ]
})
export class CompanyDetailComponent implements OnInit {

  profileForm: FormGroup = this.formBuilder.group({
    firstName: [this.localStorage.getItem('firstName'), [Validators.required]],
    lastName: [this.localStorage.getItem('lastName'), [Validators.required]],
    // dateOfBirth: ['', Validators.required],
    companyName: ['', Validators.required],
    about: ['', Validators.required],
    contactNumber: ['', [Validators.required, Validators.minLength(10)]],
    companyWebsite: ['', [Validators.required]],
    address: ['', Validators.required]
  })
  profileFields: FormField[] = [
    {
      type: 'input',
      label: 'Company name',
      formControlName: 'companyName',
      class: ['w'],
    },
    {
      type: 'textarea',
      label: 'About company',
      formControlName: 'about',
      class: ['w']
    },
    {
      type: 'tel',
      label: 'Contact number',
      formControlName: 'contactNumber',
      class: ['w']
    },
    {
      type: 'url',
      label: 'Company website',
      formControlName: 'companyWebsite',
      class: ['w']
    },
    {
      type: 'textarea',
      label: 'Address',
      formControlName: 'address',
      class: ['w']
    },
    {
      type: 'submit',
      label: 'Complete',
      class: ['d-flex', 'justify-content-end']
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorage,
    private employerService: EmployerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  recieveFormData() {
    // console.log(this.profileForm.value);
    this.employerService.updateEmployerProfile(this.profileForm.value).subscribe({
      next: data => {
        this.localStorage.removeItem('accessToken')
        this.toastr.success('Registeration completed successfully');
        this.router.navigateByUrl('/login');
      }
    });
  }

}
