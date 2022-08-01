import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { FormField } from 'src/app/data/models/form-field.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Signup',
      routerLink: ''
    },
    {
      label: 'Verify Account',
      routerLink: 'verify-account'
    },
    {
      label: 'Personal Information',
      routerLink: 'personal-information'
    },
  ]
  profileForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    about: [''],
  })
  profileFields: FormField[] = [
    {
      type: 'input',
      label: 'First name',
      formControlName: 'firstName',
      class: ['w']
    },
    {
      type: 'input',
      label: 'Last name',
      formControlName: 'lastName',
      class: ['w']
    },
    {
      type: 'date',
      label: 'Date of Birth',
      formControlName: 'dateOfBirth',
      class: ['w']
    }, 
    {
      type: 'select',
      label: 'Gender',
      formControlName: 'gender',
      class: ['w'],
      options: [
        {
          value: 'Male',
          option: 'Male'
        },
        {
          value: 'Female',
          option: 'Female'
        }
      ]
    },
    {
      type: 'textarea',
      label: 'Bio',
      formControlName: 'about',
      class: ['w']
    }
  ]
  hobbiesArray = new FormArray([new FormControl('', Validators.required)]);
  educationDetails = new FormArray<FormGroup>([this.createEducation()]);

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.educationDetails);
  }

  addInputControl() {
    this.hobbiesArray.push(new FormControl('', Validators.required));
  }

  removeInputControl(idx: number) {
    this.hobbiesArray.removeAt(idx);
  }

  receiveFormData() {
    // console.log(this.registerationForm.value);
  }

  createEducation(): FormGroup {
    return this.formBuilder.group({
      qualification: ['', Validators.required],
      courseName: ['', Validators.required],
      universityName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
  }

  addEducation() {
    this.educationDetails.push(this.createEducation());
  }

  removeEducation(id: number) {
    this.educationDetails.removeAt(id);
  }

}
