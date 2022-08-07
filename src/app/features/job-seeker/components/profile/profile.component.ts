import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormField } from 'src/app/data/models/form-field.model';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = this.formBuilder.group({
    Name: ['Deepikaa Ravishankar', [Validators.required]],
    Email: ['deepikaa@gmail.com', [Validators.required]],
    Location: ['Coimbatore, TamilNadu, Coimbatore', Validators.required],
    Designation: ['Software Engineer', Validators.required],
    Bio: ['Software Engineer'],
  })
  profileFields: FormField[] = [
    {
      type: 'input',
      label: 'Name',
      formControlName: 'Name',
      class: ['w'],
    },
    {
      type: 'input',
      label: 'Email',
      formControlName: 'Email',
      class: ['w'],
    },
    {
      type: 'input',
      label: 'Location',
      formControlName: 'Location',
      class: ['w']
    },
    {
      type: 'textarea',
      label: 'Bio',
      formControlName: 'Bio',
      class: ['w']
    },
    {
      type: 'input',
      label: 'Designation',
      formControlName: 'Designation',
      class: ['w']
    }

  ]
  educationForm!: FormGroup;
  educationFields: FormField[] = [
    {
      type: 'input',
      label: 'University or College Name',
      formControlName: 'universityName',
      class: ['w']
    },
    {
      type: 'input',
      label: 'Degree',
      formControlName: 'qualification',
      class: ['w']
    },
    {
      type: 'input',
      label: 'Field of study',
      formControlName: 'courseName',
      class: ['w']
    },
    {
      type: 'input',
      label: 'Start year',
      formControlName: 'startDate',
      class: ['w']
    },
    {
      type: 'input',
      label: 'End year',
      formControlName: 'endDate',
      class: ['w']
    },
    // {
    //   type: 'submit',
    //   label: 'Add',
    //   class: ['d-flex justify-content-end']
    // }
  ]
  experienceForm!: FormGroup;
  experienceFields: FormField[] = [
    {
      type: 'input',
      label: 'Company name',
      formControlName: 'companyName',
      class: ['w']
    },
    {
      type: 'input',
      label: 'Designation',
      formControlName: 'designation',
      class: ['w']
    },
    {
      type: 'number',
      label: 'Year of in this company',
      formControlName: 'yearOfExperience',
      class: ['w']
    }
  ]
  profileDetails!: FormGroup;
  educationDetails = new FormArray<FormGroup>([]);
  experienceDetails = new FormArray<FormGroup>([]);
  action!: string;
  editableId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorage,
    private jobSeekerService: JobSeekerService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  // education operations
  getEducation() {
    return this.formBuilder.group({
      qualification: ['', Validators.required],
      courseName: ['', Validators.required],
      universityName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  addEducation(ref: any) {
    this.action = 'Add';
    this.educationForm = this.getEducation();
    this.modalService.open(ref).result.then((result) => { })
  }

  editEducation(ref: any, id: number) {
    this.action = 'Update';
    this.editableId = id;
    this.educationForm = this.educationDetails.controls[id];
    this.modalService.open(ref).result.then((result) => { })
  }

  deleteEducation(id: number) {
    this.educationDetails.removeAt(id);
  }

  executeEducationAction() {
    if (this.action == 'Add') {
      this.educationDetails.push(this.educationForm);
      this.toastr.success('Education added', 'Success');
    } else {
      this.educationDetails.controls[this.editableId] = this.educationForm;
      this.toastr.success('Education updated', 'Success');
    }
    this.modalService.dismissAll();
  }

  // experience operations
  getExperience(): FormGroup {
    return this.formBuilder.group({
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
      yearOfExperience: ['']
    })
  }

  addExperience(ref: any) {
    this.action = 'Add',
      this.experienceForm = this.getExperience();
    this.modalService.open(ref).result.then(result => { });
  }

  editExperience(ref: any, id: number) {
    this.action = 'Update',
      this.editableId = id;
    this.experienceForm = this.experienceDetails.controls[id];
    this.modalService.open(ref).result.then(result => { });
  }

  deleteExperience(id: number) {
    this.experienceDetails.removeAt(id);
  }

  executeExperienceAction() {
    if (this.action == 'Add') {
      this.experienceDetails.push(this.experienceForm);
      this.toastr.success('Experience added', 'Success');
    } else {
      this.experienceDetails.controls[this.editableId] = this.experienceForm;
      this.toastr.success('Experience updated', 'Success');
    }
    this.modalService.dismissAll();
  }

  // update profile method
  updateProfile(ref: any) {
    // this.jobSeekerService.updateProfile(this.profileForm.value)
    //   .subscribe({
    //     next: res => console.log(res)
    //   });
    this.action = 'Update';
    console.log(this.action);
    this.modalService.open(ref).result.then((result) => { })
  }
  executeProfileAction() {
    if (this.action == 'Update') {
      this.toastr.success('Profile updated', 'Success');
    }
    this.modalService.dismissAll();
  }


}
