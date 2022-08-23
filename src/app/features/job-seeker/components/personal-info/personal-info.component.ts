import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxPhotoEditorService } from 'ngx-photo-editor';

import { FormField } from 'src/app/data/models/form-field.model';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';
import { EducationService } from 'src/app/data/services/education.service';
import { ExperienceService } from 'src/app/data/services/experience.service';
import { BlobService } from 'src/app/data/services/blob.service';
import { environment } from 'src/environments/environment';
import { PreferredJobService } from 'src/app/data/services/preferred-job.service';
import { SkillsService } from 'src/app/data/services/skills.service';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styles: []
})
export class PersonalInfoComponent implements OnInit {

  isPreferredJobAdded: boolean = true;
  preferredJobArray: any = [];
  skillArray: any = [];
  isSkillAdded: boolean = true;


  preferredJobFields: FormField[] = [
    {
      type: 'chips',
      label: 'Enter Job Title',
      formControlName: 'preferredJobTitle',
      class: ['w'],
    },
  ]

  skillFields: FormField[] = [
    {
      type: 'chips',
      label: 'Enter your skill',
      formControlName: 'SkillTitle',
      class: ['w'],
    },
  ]

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
    // {
    //   type: 'number',
    //   label: 'Year\'(s) of experience',
    //   formControlName: 'yearOfExperience',
    //   class: ['w']
    // }
    {
      type: 'date',
      label: 'Start date',
      formControlName: 'startDate',
      class: ['w']
    },
    {
      type: 'date',
      label: 'End date',
      formControlName: 'toDate',
      class: ['w']
    }
  ]
  educationDetails = new FormArray<FormGroup>([]);
  experienceDetails = new FormArray<FormGroup>([]);
  action!: string;
  editableId!: number;
  isImageLoaded = true;
  imageUrl: string = "https://cdn-icons-png.flaticon.com/512/1077/1077012.png?w=360";
  routeConstants = RouteConstants;
  isProfilePhotoUploaded = false;

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
    private preferredJobService: PreferredJobService,
    private skillService: SkillsService
  ) { }

  ngOnInit(): void {
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
            this.isProfilePhotoUploaded = true;
            this.getProfilePicture();
          },
          error: (error) => {
          },
        });
      });
  }

  getProfilePicture() {
    this.isImageLoaded = false;
    this.profileService.getProfilePicture().subscribe({
      next: (data: any) => {
        if (data.url) {
          let res = data.url;
          this.imageUrl = res + "?" + environment.profile_sas_token;
        }
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
      // yearOfExperience: ['']
      startDate: [new Date(), Validators.required],
      toDate: [new Date(), Validators.required]
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
        next: () => {
          this.toastr.success('Profile updated');
        }
      });
  }

  complete() {
    if (!this.isProfilePhotoUploaded) {
      let formData: FormData = new FormData();
    }
    this.jobSeekerService.updateProfile(this.profileForm.value).subscribe();
    const educations = [];
    for (let i = 0; i < this.educationDetails.length; i++) {
      educations.push(this.educationDetails.controls[i].value);
    }
    this.educationService.addEducations(educations).subscribe({
    });
    const experiences = [];
    for (let i = 0; i < this.experienceDetails.length; i++) {
      experiences.push(this.experienceDetails.controls[i].value);
    }
    this.experienceService.addExperiences(experiences).subscribe({
    });
    this.toastr.success("Registeration completed");
    this.router.navigateByUrl(this.routeConstants.jobSeekerHome);
  }
  // ----------------------------------- Preferred Job operations  -------------------------------------
  preferredJobForm!: FormGroup;
  getjob(): FormGroup {
    return this.formBuilder.group({
      preferredJobTitle: ["", Validators.required],
    });
  }
  // Modal Add job
  addjob(ref: any) {
    this.preferredJobForm = this.getjob();

    this.modalService.open(ref).result.then((result) => {});
  }

  getPreferredJob() {
    this.preferredJobService.getPreferredJob().subscribe((res) => {
      this.preferredJobArray = res;
    });
  }
  deleteJob(jobId: number) {
    this.preferredJobService
      .deletePreferredJobbyId(jobId)
  }
  addJob(jobToAdd: any) {
    this.preferredJobService
      .addPreferredJob([{ jobTitle: jobToAdd.preferredJobTitle }])
      .subscribe((res) => this.getPreferredJob());
  }
  preferredjobArray: any=[];
  executePreferredJobAction() {
    if (this.action == "Add") {
      this.preferredJobService.getPreferredJob().subscribe((res: any) => {
        for (var j = 0; j < res.length; j++) {
          this.preferredjobArray.push(res[j].jobTitle);
        }
        for (var i = 0; i < this.preferredJobForm.value.preferredJobTitle.length; i++) {
          for (var j = 0; j < this.preferredjobArray.length; j++) {
            if (this.preferredjobArray[j].toLowerCase()=== (this.preferredJobForm.value.preferredJobTitle[i].toLowerCase())) {
              this.isPreferredJobAdded = false;
              break;
            }

          }
        }
        if (this.isPreferredJobAdded) {
          for (var i = 0; i < this.preferredJobForm.value.preferredJobTitle.length; i++) {
            this.preferredJobService.addPreferredJob([{ jobTitle: this.preferredJobForm.value.preferredJobTitle[i] }]).subscribe(res => this.getPreferredJob());
            this.toastr.success('Job added');
            this.modalService.dismissAll();
          }
        }
        else {
          this.isPreferredJobAdded = true;
          this.toastr.warning("Job already added");
          this.modalService.dismissAll();
        }
      });
    }
  }

  //  -----------------------------------Skills Operations -----------------------------------
  skillForm!: FormGroup;
  getskill(): FormGroup {
    return this.formBuilder.group({
      SkillTitle: ['', Validators.required]
    })
  }
  // Modal Add job
  addskill(ref: any) {
    this.skillForm = this.getskill();
    this.modalService.open(ref).result.then((result) => {});
  }
  getSkill() {
    this.skillService.getSkills().subscribe((res) => {
      this.skillArray = res;
      // this.spinner.hide();
    });
  }
  deleteSkill(jobId: number) {
    this.skillService.deleteSkillbyId(jobId).subscribe((res) => {
    });
  }
  addSkill(jobToAdd: any) {
    this.skillService
      .addSkills([{ skillTitle: jobToAdd.skillTitle, skillId: 0 }])
      .subscribe((res) => this.getSkill());
  }
  skillTitleArray: any = []
  executeSkillAction() {
    if (this.action == 'Add') {
      this.skillService.getSkills().subscribe(res => {
        for (var i = 0; i < res.length; i++) {
          this.skillTitleArray.push(res[i].skillTitle)
        }
        for (var i = 0; i < this.skillForm.value.SkillTitle.length; i++) {
          for (var j = 0; j < this.skillTitleArray.length; j++) {
            if (this.skillTitleArray[j].toLowerCase() === (this.skillForm.value.SkillTitle[i].toLowerCase())) {
              this.isSkillAdded = false;
              break;
            }

          }
          // if (res[i].skillTitle === this.skillForm.value.skillTitle) {
          //   this.isSkillAdded = false;
          //   break;
          // }
        }
        if (this.isSkillAdded) {
          for (var i = 0; i < this.skillForm.value.SkillTitle.length; i++) {
            this.skillService.addSkills([{ skillTitle: this.skillForm.value.SkillTitle[i], skillId: i }]).subscribe(res => this.getSkill());
            this.modalService.dismissAll();
          }
          this.toastr.success('Skills added');
        }
        else {
          this.isSkillAdded = true;
          this.toastr.warning("Skill already added!");
          this.modalService.dismissAll();
        }
      });
    }
  }
}
