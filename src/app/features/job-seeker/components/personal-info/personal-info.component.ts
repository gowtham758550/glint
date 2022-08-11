import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/data/models/form-field.model';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EducationService } from 'src/app/data/services/education.service';
import { Education } from 'src/app/data/models/education.model';
import { ExperienceService } from 'src/app/data/services/experience.service';
import { Router } from '@angular/router';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { BlobService } from 'src/app/data/services/blob.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styles: []
})
export class PersonalInfoComponent implements OnInit {

  profileForm: FormGroup = this.formBuilder.group({
    firstName: [this.localStorage.getItem('firstName'), [Validators.required, Validators.minLength(3)]],
    lastName: [this.localStorage.getItem('lastName'), [Validators.required, Validators.minLength(1)]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    about: [''],
  })
  profileFields: FormField[] = [
    {
      type: 'input',
      label: 'First name',
      formControlName: 'firstName',
      class: ['w'],
    },
    {
      type: 'input',
      label: 'Last name',
      formControlName: 'lastName',
      class: ['w'],
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
          label: 'Male'
        },
        {
          value: 'Female',
          label: 'Female'
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
      type: 'date',
      label: 'Start year',
      formControlName: 'startDate',
      class: ['w']
    },
    {
      type: 'date',
      label: 'End year',
      formControlName: 'completionDate',
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
      formControlName: 'previousCompanyName',
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
  educationDetails = new FormArray<FormGroup>([]);
  experienceDetails = new FormArray<FormGroup>([]);
  action!: string;
  editableId!: number;
  isImageLoaded = true;
  imageUrl: string = "https://cdn-icons-png.flaticon.com/512/1077/1077012.png?w=360";

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorage,
    private jobSeekerService: JobSeekerService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private router: Router,
    private profileService: BlobService,
    private imageService: NgxPhotoEditorService,
  ) { }

  ngOnInit(): void {
    this.getProfilePicture();
  }
  openFileTrigger(component: HTMLElement) {
    component.click();
  }
  updateProfilePicture($event: any) {
    this.imageService
      .open($event, {
        aspectRatio: 4 / 3,
        autoCropArea: 1,
      })
      .subscribe((data: any) => {
        // this.output = data;
        let file: any = data.file;
        let formData: FormData = new FormData();
        formData.append("profilePicture", file, file.name);
        this.profileService.addProfilePicture(formData).subscribe({
          next: (_data) => {
            console.log("success");
            this.getProfilePicture();
          },
          error: (error) => {
            console.log(error);
          },
        });
      });
  }

  getProfilePicture() {
    this.isImageLoaded = false;
    this.profileService.getProfilePicture().subscribe({
      next: (data: any) => {
        let res = data.url;
        this.imageUrl = res + "?" + environment.sas_token;
        this.isImageLoaded = true;
      },
    });
  }

  // education operations
  getEducation() {
    return this.formBuilder.group({
      qualification: ['', Validators.required],
      courseName: ['', Validators.required],
      universityName: ['', Validators.required],
      startDate: ['', Validators.required],
      completionDate: ['', Validators.required]
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
      previousCompanyName: ['', Validators.required],
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

  // update profile api call
  updateProfile() {
    this.jobSeekerService.updateProfile(this.profileForm.value)
      .subscribe({
        next: res => console.log(res)
      });
  }

  complete() {
    this.jobSeekerService.updateProfile(this.profileForm.value).subscribe();
    const educations = [];
    for (let i = 0; i < this.educationDetails.length; i++) {
      educations.push(this.educationDetails.controls[i].value);
    }
    console.log(educations);
    this.educationService.addEducations(educations).subscribe({
      next: data => console.log(data)
    });
    const experiences = [];
    for (let i = 0; i < this.experienceDetails.length; i++) {
      experiences.push(this.experienceDetails.controls[i].value);
    }
    this.experienceService.addExperiences(experiences).subscribe({
      next: data => console.log(data)
    });
    this.toastr.success("Registeration completed");
    this.router.navigateByUrl('/job-seeker/dashboard');
  }
}
