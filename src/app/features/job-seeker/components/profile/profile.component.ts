import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormField } from 'src/app/data/models/form-field.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { EducationService } from 'src/app/data/services/education.service';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  email!: string;
  accessToken = this.localStorage.getItem('accessToken');
  jobSeekerProfile: any = {};
  profileForm!: FormGroup;
  educationInfo: any;

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorage,
    private jobSeekerService: JobSeekerService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthService,
    private educationService: EducationService
  ) { }

  ngOnInit(): void {
    this.getJobSeekerProfile();
    this.email = this.authService.getEmail(this.accessToken);
    this.educationInfo = this.educationService.getEducation().subscribe(res => { this.educationArray=res });

  }
  // For getting Job Seeker Profile using Id
  getJobSeekerProfile() {
    this.jobSeekerService.getUserById(
      this.authService.getUserId(
        this.localStorage.getItem('accessToken')
      )).subscribe((res: any) => {
        console.log(res)
        this.jobSeekerProfile = res
        this.profileForm = this.formBuilder.group({
          firstName: [res.firstName, [Validators.required]],
          lastName: [res.lastName, [Validators.required]],
          gender: [res.gender, [Validators.required]],
          dateOfBirth: [res.dateOfBirth],
          location: [res.location, Validators.required],
          about: ['Software Engineer'],
        })
      });
  }


  profileFields: FormField[] = [
    {
      type: 'input',
      label: 'FirstName',
      formControlName: 'firstName',
      class: ['w'],
    },
    {
      type: 'input',
      label: 'LastName',
      formControlName: 'lastName',
      class: ['w'],
    },
    {
      type: 'input',
      label: 'Location',
      formControlName: 'location',
      class: ['w'],
    },
    {
      type: 'textarea',
      label: 'Bio',
      formControlName: 'about',
      class: ['w']
    },
    {
      type: 'date',
      label: 'Date Of Birth',
      formControlName: 'dateOfBirth',
      class: ['w']
    }
    // },
    // {
    //   type: 'input',
    //   label: 'Designation',
    //   formControlName: 'Designation',
    //   class: ['w']
    // }

  ]
  educationForm!: FormGroup;
  educationFields: FormField[] = [
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
      label: 'University or College Name',
      formControlName: 'universityName',
      class: ['w']
    },
    {
      type: 'date',
      label: 'Start year',
      formControlName: 'startDate',
      class: ['w']
    },
    {
      type: 'date',
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
  educationArray: any = [];
  educationDetails = new FormArray<FormGroup>([]);
  experienceDetails = new FormArray<FormGroup>([]);
  action!: string;
  editableId!: number;




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
    console.log(this.educationForm)
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
      // this.educationArray.push(this.educationInfo)
      console.log(typeof this.educationInfo);
      console.log(this.educationArray);
      this.educationService.addEducations(this.educationArray).subscribe(res => console.log(res))
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
    this.action = 'Update';
    console.log(this.action);
    this.modalService.open(ref).result.then((result) => { })
  }
  executeProfileAction() {
    if (this.action == 'Update') {
      console.log(this.profileForm.value);
      this.jobSeekerService.updateProfile(this.profileForm.value).subscribe(res => console.log(res));
      this.toastr.success('Profile updated', 'Success');
    }
    this.modalService.dismissAll();
  }
}
