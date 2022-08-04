import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    about: ['', Validators.required]
  })
  profileFields: FormField[] = [
    // {
    //   type: 'input',
    //   label: 'First name',
    //   formControlName: 'firstName',
    //   class: ['w'],
    //   disabled: true
    // },
    // {
    //   type: 'input',
    //   label: 'Last name',
    //   formControlName: 'lastName',
    //   class: ['w'],
    //   disabled: true
    // },
    // {
    //   type: 'date',
    //   label: 'Date of Birth',
    //   formControlName: 'dateOfBirth',
    //   class: ['w']
    // },
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
      type: 'submit',
      label: 'Complete',
      class: ['d-flex', 'justify-content-end']
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorage,
    private employerService: EmployerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  recieveFormData() {
    // console.log(this.profileForm.value);
    this.employerService.updateEmployerProfile(this.profileForm.value).subscribe({
      next: data => {
        this.localStorage.removeItem('accessToken')
        this.router.navigateByUrl('/login');
      }
    });
  }

}
