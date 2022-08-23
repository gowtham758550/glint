import { DatePipe, formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPhotoEditorService } from "ngx-photo-editor";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { FormField } from "src/app/data/models/form-field.model";
import { Education } from "src/app/data/models/education.model";
import { AuthService } from "src/app/data/services/auth.service";
import { BlobService } from "src/app/data/services/blob.service";
import { EducationService } from "src/app/data/services/education.service";
import { ExperienceService } from "src/app/data/services/experience.service";
import { JobSeekerService } from "src/app/data/services/job-seeker.service";
import { LocalStorage } from "src/app/data/services/local-storage.service";
import { PreferredJobService } from "src/app/data/services/preferred-job.service";
import { SkillsService } from "src/app/data/services/skills.service";
import { environment } from "src/environments/environment";
import { EducationInfo } from "src/app/data/models/education-info.model";
import { ExperienceArray } from "src/app/data/models/ExperienceArray.model";
import { SkillData } from "src/app/data/models/Skilldata.model";

@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html",
  styleUrls: ["profile.component.css"],
})
export class ProfileComponent implements OnInit {
  backgroundImage: string = "/assets/defaultCoverPicture.jpg";
  email!: string;
  jobSeekerProfile: Object = {};
  profileForm!: FormGroup;
  educationInfo: EducationInfo[]=[];
  educationToEdit: Object={};
  imageUrl: string = "/assets/defaultProfilePicture.png";
  experienceToEdit: Object={};
  experienceArray: ExperienceArray[] = [];
  editableExperience: Object={};
  editableExperienceId!: number;
  jobSeekerArray:any =[];
  isCoverclick: boolean = true;
  preferredJobArray: any = [];
  skillArray: SkillData[] = [];
  newPreferredJob!: string;
  isSkillAdded: boolean = true;
  isPreferredJobAdded: boolean = true;
  profileDetails!: FormGroup;
  educationArray:EducationInfo[] = [];
  educationDetails = new FormArray<FormGroup>([]);
  experienceDetails = new FormArray<FormGroup>([]);
  action!: string;
  editableId!: number;
  editableEducation: Object={};
  startDate!: Date;
  endDate!: Date;
  isImageLoaded = false;
  isCoverImageLoaded = false;
  // resume!: any;

  preferredJobFields: FormField[] = [
    {
      type: 'chips',
      label: 'Enter Job Title',
      formControlName: 'preferredJobTitle',
      class: ['w'],
    },
  ];
  skillFields: FormField[] = [
    {
      type: 'chips',
      label: 'Enter your skills ',
      formControlName: 'SkillTitle',
      class: ['w'],
    }
  ]

  profileFields: FormField[] = [
    {
      type: "input",
      label: "FirstName",
      formControlName: "firstName",
      class: ["w"],
    },
    {
      type: "input",
      label: "LastName",
      formControlName: "lastName",
      class: ["w"],
    },
    {
      type: "input",
      label: "Location",
      formControlName: "location",
      class: ["w"],
    },
    {
      type: "textarea",
      label: "Bio",
      formControlName: "about",
      class: ["w"],
    },
    {
      type: "date",
      label: "Date Of Birth",
      formControlName: "dateOfBirth",
      class: ["w"],
    },
  ];
  educationForm!: FormGroup;
  educationFields: FormField[] = [
    {
      type: "input",
      label: "Degree",
      formControlName: "qualification",
      class: ["w"],
    },
    {
      type: "input",
      label: "Field of study",
      formControlName: "courseName",
      class: ["w"],
    },
    {
      type: "input",
      label: "University or College Name",
      formControlName: "universityName",
      class: ["w"],
    },
    {
      type: "date",
      label: "Start year",
      formControlName: "startDate",
      class: ["w"],
    },
    {
      type: "date",
      label: "End year",
      formControlName: "completionDate",
      class: ["w"],
    },
  ];
  experienceForm!: FormGroup;
  experienceFields: FormField[] = [
    {
      type: "input",
      label: "Company name",
      formControlName: "previousCompanyName",
      class: ["w"],
    },
    {
      type: "input",
      label: "Designation",
      formControlName: "designation",
      class: ["w"],
    },
    {
      type: "date",
      label: "Start Date",
      formControlName: "startDate",
      class: ["w"],
    },
    {
      type: "date",
      label: "End Date",
      formControlName: "toDate",
      class: ["w"],
    },
    {
      type: "number",
      label: "Salary",
      formControlName: "salary",
      class: ["w"],
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private profileService: BlobService,
    private imageService: NgxPhotoEditorService,
    private localStorage: LocalStorage,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private jobSeekerService: JobSeekerService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private preferredJobService: PreferredJobService,
    private skillService: SkillsService,
    private blobService: BlobService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.email = this.authService.getEmail();
    this.getProfilePicture();
    this.getCoverPicture();
    this.getJobSeekerProfile();
    this.getEducationList();
    this.getExperienceList();
    this.getJobSeeker();
    this.getPreferredJob();
    this.getSkill();
  }

  ngAfterViewInit(): void {}

  openFileTrigger(component: HTMLElement) {
    component.click();
  }
  openCoverPictureTrigger(component: HTMLElement) {
    component.click();
  }

  // --------------------------------------- Profile Picture Operations-------------------------------------
  updateProfilePicture($event: any) {
    this.imageService
      .open($event, {
        aspectRatio: 1 / 1,
        autoCrop: true,
        autoCropArea: 1,
        roundCropper: true,
        viewMode: 1,
      })
      .subscribe((data: any) => {
        let file: any = data.file;
        let formData: FormData = new FormData();
        formData.append("profilePicture", file, file.name);
        this.profileService.addProfilePicture(formData).subscribe({
          next: (_data) => {
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
        let res = data.url;
        this.imageUrl = res + "?" + environment.profile_sas_token;
        this.isImageLoaded = true;
      },
    });
  }

  // --------------------------------------updateCoverPicture---------------------------------
  updateCoverPicture($event: any) {
    this.imageService
      .open($event, {
        aspectRatio: 20 / 4,
        autoCrop: true,
        autoCropArea: 1,
        viewMode: 1,
      })
      .subscribe((data: any) => {
        // this.output = data;
        let file: any = data.file;
        let formData: FormData = new FormData();
        formData.append("coverPicture", file, file.name);
        this.profileService.addCoverPicture(formData).subscribe({
          next: (_data) => {
            this.getCoverPicture();
          },
          error: (error) => {
          },
        });
      });
  }

  getCoverPicture() {
    this.isCoverImageLoaded = false;
    this.profileService.getCoverPicture().subscribe({
      next: (data: any) => {
        let res = data.url;
        this.backgroundImage = res + "?" + environment.cover_sas_token;
        this.isCoverImageLoaded = true;
      },
    });
  }

  // -------------------------------Resume Operation-----------------------------------

  uploadResume(event: any) {
    this.spinner.show();
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("resume", file, file.name);
      this.profileService.addResume(formData).subscribe({
        next: (_data) => {
          this.toastr.success("Resume uploaded successfully!");
          //this.getResume();
          this.spinner.hide();
        },
        error: (error) => {
        },
      });
    }
  }

  getResume() {
    this.blobService.getResume().subscribe((res: any) => {
      var link = document.createElement("a");
      link.href = res.url + "?" + environment.resume_sas_token;
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  }

  //----------------------- Get Education List Api Call ---------------------------------
  getEducationList() {
     this.educationService
      .getEducation()
      .subscribe((res) => {
        this.educationArray = res;
      });
  }
  //----------------------- Get Experience List Api Call ---------------------------------

  getExperienceList() {
     this.experienceService
      .getExperience()
      .subscribe((res) => {
        this.experienceArray = res;
      });
  }
  //-----------------------Get JobSeeker Detail Api Call ---------------------------------

  getJobSeeker() {
    this.jobSeekerService
      .getUserById(
        this.authService.getUserId(this.localStorage.getItem("accessToken"))
      )
      .subscribe((res: any) => {
        res.dateOfBirth = this.datePipe.transform(
          res.dateOfBirth,
          "dd-MM-yyyy"
        );
        console.log(res.dateOfBirth);
        console.log(res);
        this.jobSeekerArray = res;
      });
  }
  //-----------------------Get JobSeeker Profile using ID(Api Call) ---------------------------------
  dob: any;
  getJobSeekerProfile() {
    this.jobSeekerService
      .getUserById(
        this.authService.getUserId(this.localStorage.getItem("accessToken"))
      )
      .subscribe((res: any) => {
        console.log(res);
        this.jobSeekerArray = res;
        console.log(this.jobSeekerArray);
        this.jobSeekerProfile = res;
        this.dob = this.datePipe.transform(res.dateOfBirth, "dd-MM-yyyy");
        this.profileForm = this.formBuilder.group({
          firstName: [res.firstName, [Validators.required]],
          lastName: [res.lastName, [Validators.required]],
          gender: [res.gender, [Validators.required]],
          dateOfBirth: [formatDate(res.dateOfBirth, "yyyy-MM-dd", "en")],
          location: [res.location, Validators.required],
          about: ["Software Engineer"],
        });
      });
  }
  // ----------------------------education operations--------------------------------
  getEducation() {
    return this.formBuilder.group({
      qualification: ["", Validators.required],
      courseName: ["", Validators.required],
      universityName: ["", Validators.required],
      startDate: ["", Validators.required],
      completionDate: ["", Validators.required],
    });
  }

  addEducation(ref: any) {
    this.action = "Add";
    this.educationForm = this.getEducation();

    this.getEducationList();
    this.modalService.open(ref).result.then((result) => {});
  }

  editEducation(ref: any, id: number) {
    this.action = "Update";
    this.editableId = id;
    this.educationForm = this.getEducation();
    this.educationService.getEducationById(id).subscribe((res) => {
      this.editableEducation = res;
      console.log(res);
      this.educationForm.controls["qualification"].setValue(res.qualification);
      this.educationForm.controls["universityName"].setValue(
        res.universityName
      );
      this.educationForm.controls["courseName"].setValue(res.courseName);
      this.educationForm.controls["startDate"].setValue(
        formatDate(res.startDate, "yyyy-MM-dd", "en")
      );
      this.educationForm.controls["completionDate"].setValue(
        formatDate(res.completionDate, "yyyy-MM-dd", "en")
      );
    });
    this.modalService.open(ref).result.then((result) => {});
  }

  deleteEducation(id: number) {
    this.educationService.deleteEducationById(id).subscribe((res) => {
      this.getEducationList();
      this.toastr.success("Education deleted");
    });
    this.educationDetails.removeAt(id);
  }

  executeEducationAction() {
    if (this.action == "Add") {
      const currentEducation: any = [];
      currentEducation.push(this.educationForm.value);
      this.educationService.addEducations(currentEducation).subscribe((res) => {
        this.getEducationList();
      });
      this.educationDetails.push(this.educationForm);
      this.toastr.success("Education added");
    } else {
      this.educationToEdit = {
        educationDetailId: this.editableId,
        qualification: this.educationForm.value.qualification,
        courseName: this.educationForm.value.courseName,
        universityName: this.educationForm.value.universityName,
        startDate: this.educationForm.value.startDate,
        completionDate: this.educationForm.value.completionDate,
      };
      console.log(this.educationToEdit);
      this.educationService
        .updateEducationById(this.editableId, this.educationToEdit)
        .subscribe((res) => {
          this.getEducationList();
        });
      this.educationDetails.controls[this.editableId] = this.educationForm;
      this.toastr.success("Education updated", "Success");
    }
    this.modalService.dismissAll();
  }

  // ----------------------------------- experience operations ------------------------------
  getExperience(): FormGroup {
    return this.formBuilder.group({
      previousCompanyName: ["", Validators.required],
      designation: ["", Validators.required],
      startDate: [""],
      toDate: [""],
      salary: [""],
    });
  }

  addExperience(ref: any) {
    (this.action = "Add"), (this.experienceForm = this.getExperience());
    this.getExperienceList();

    this.modalService.open(ref).result.then((result) => {});
  }

  editExperience(ref: any, id: number) {
    (this.action = "Update"), (this.editableExperienceId = id);
    console.log(this.editableExperienceId);
    this.experienceForm = this.getExperience();

    this.experienceService.getExperienceById(id).subscribe((res) => {
      this.editableExperience = res;

      console.log(res);
      this.experienceForm.controls["previousCompanyName"].setValue(
        res.previousCompanyName
      );
      this.experienceForm.controls["designation"].setValue(res.designation);
      this.experienceForm.controls["startDate"].setValue(
        formatDate(res.startDate, "yyyy-MM-dd", "en")
      );
      this.experienceForm.controls["toDate"].setValue(
        formatDate(res.toDate, "yyyy-MM-dd", "en")
      );
      this.experienceForm.controls["salary"].setValue(res.salary);
    });
    this.modalService.open(ref).result.then((result) => {});
  }

  deleteExperience(id: number) {
    this.experienceService.deleteExperienceById(id).subscribe((res) => {
      console.log(res);
      this.getExperienceList();
      this.toastr.success("Experience deleted");
    });
    this.experienceDetails.removeAt(id);
  }

  executeExperienceAction() {
    if (this.action == "Add") {
      const currentExperience: any = [];
      currentExperience.push(this.experienceForm.value);
      console.log(this.experienceForm.value);
      this.experienceService
        .addExperiences(currentExperience)
        .subscribe((res) => {
          console.log(res);
          this.getExperienceList();
        });
      this.experienceDetails.push(this.experienceForm);
      this.toastr.success("Experience added");
    } else {
      this.experienceToEdit = {
        experienceDetailId: this.editableExperienceId,
        previousCompanyName: this.experienceForm.value.previousCompanyName,
        designation: this.experienceForm.value.designation,
        startDate: this.experienceForm.value.startDate,
        toDate: this.experienceForm.value.toDate,
        salary: this.experienceForm.value.salary,
      };
      console.log(this.experienceToEdit);
      this.experienceService
        .updateExperienceById(this.editableExperienceId, this.experienceToEdit)
        .subscribe((res) => {
          console.log(res);
          this.getExperienceList();
        });
      this.experienceDetails.controls[this.editableExperienceId] =
        this.experienceForm;
      this.toastr.success("Experience updated");
    }
    this.modalService.dismissAll();
  }

  //--------------------------------------- update profile method------------------------------------------------
  updateProfile(ref: any) {
    this.action = "Update";
    console.log(this.action);
    this.modalService.open(ref).result.then((result) => {});
  }
  executeProfileAction() {
    if (this.action == "Update") {
      console.log(this.profileForm.value);
      this.jobSeekerService
        .updateProfile(this.profileForm.value)
        .subscribe((res) => {
          console.log(res);
          this.getJobSeeker();
        });

      this.toastr.success("Profile updated");
    }
    this.modalService.dismissAll();
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
    (this.action = "Add"), console.log(this.action);
    this.preferredJobForm = this.getjob();

    this.modalService.open(ref).result.then((result) => {});
  }

  getPreferredJob() {
    this.preferredJobService.getPreferredJob().subscribe((res) => {
      this.preferredJobArray = res;
      console.log(res);
    });
  }
  deleteJob(jobId: number) {
    console.log(this.preferredJobArray);
    this.preferredJobService
      .deletePreferredJobbyId(jobId)
      .subscribe((res) => console.log(res));
    console.log(jobId);
  }
  addJob(jobToAdd: any) {
    console.log(jobToAdd);
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
          console.log(this.preferredjobArray)
          for (var j = 0; j < this.preferredjobArray.length; j++) {
            console.log(this.preferredjobArray[j]);
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

  // ------------------------------------------- Skills Operation -------------------------------------------
  skillForm!: FormGroup;
  getskill(): FormGroup {
    return this.formBuilder.group({
      SkillTitle: ['', Validators.required]
    })
  }
  // Modal Add job
  addskill(ref: any) {
    (this.action = "Add"), console.log(this.action);
    this.skillForm = this.getskill();
    this.modalService.open(ref).result.then((result) => {});
  }
  getSkill() {
    this.skillService.getSkills().subscribe((res) => {
      this.skillArray = res;
      this.spinner.hide();
      console.log(res);
    });
  }
  deleteSkill(jobId: number) {
    console.log(jobId);
    this.skillService.deleteSkillbyId(jobId).subscribe((res) => {
      console.log(res);
    });
    console.log(jobId);
  }
  addSkill(jobToAdd: any) {
    console.log(jobToAdd);
    this.skillService
      .addSkills([{ skillTitle: jobToAdd.skillTitle }])
      .subscribe((res) => this.getSkill());
  }
  skillTitleArray: any = []
  executeSkillAction() {
    if (this.action == 'Add') {
      this.skillService.getSkills().subscribe(res => {
        console.log(this.skillForm.value.SkillTitle)
        for (var i = 0; i < res.length; i++) {
          this.skillTitleArray.push(res[i].skillTitle)
        }
        for (var i = 0; i < this.skillForm.value.SkillTitle.length; i++) {
          console.log(this.skillTitleArray)
          for (var j = 0; j < this.skillTitleArray.length; j++) {
            if (this.skillTitleArray[j].toLowerCase() === (this.skillForm.value.SkillTitle[i].toLowerCase())) {
              this.isSkillAdded = false;
              break;
            }

          }
        }
        if (this.isSkillAdded) {
          for (var i = 0; i < this.skillForm.value.SkillTitle.length; i++) {
            this.skillService.addSkills([{ skillTitle: this.skillForm.value.SkillTitle[i] }]).subscribe(res => this.getSkill());
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
