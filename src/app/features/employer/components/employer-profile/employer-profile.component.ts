import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Validators, FormArray, FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { FormField } from "src/app/data/models/form-field.model";
import { AuthService } from "src/app/data/services/auth.service";
import { EmployerService } from "src/app/data/services/employer.service";
import { JobSeekerService } from "src/app/data/services/job-seeker.service";
import { LocalStorage } from "src/app/data/services/local-storage.service";
import { DatePipe } from "@angular/common";
import { NgxCroppedEvent, NgxPhotoEditorService } from "ngx-photo-editor";
import { BlobService } from "src/app/data/services/blob.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-employer-profile",
  templateUrl: "employer-profile.component.html",
  styles: [],
})
export class EmployerProfileComponent implements OnInit {
  isImageLoaded = false;
  imageUrl!: string;
  defaultImageUrl: string = "https://cdn-icons-png.flaticon.com/512/1077/1077012.png?w=360";

  profileForm!: FormGroup;
  employerArray: any = [];
  email!: string;
  accessToken = this.localStorage.getItem("accessToken");
  profileFields: FormField[] = [
    {
      type: "input",
      label: "companyName",
      formControlName: "companyName",
      class: ["w"],
    },
    {
      type: "input",
      label: "First Name",
      formControlName: "firstName",
      class: ["w"],
    },
    {
      type: "input",
      label: "Last Name",
      formControlName: "lastName",
      class: ["w"],
    },
    {
      type: "input",
      label: "Contact Number",
      formControlName: "contactNumber",
      class: ["w"],
    },
    {
      type: "date",
      label: "Date Of Birth",
      formControlName: "dateOfBirth",
      class: ["w"],
    },
    {
      type: 'textarea',
      label: 'About',
      formControlName: 'about',
      class: ['w'],
    },]
  action!: string;
  jobSeekerProfile: any;

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
        return this.imageUrl
      },
    }
    );
  }
  updateProfile(ref: any) {
    this.action = "Update";
    console.log(this.action);
    this.modalService.open(ref).result.then((result) => { });
  }
  executeProfileAction() {
    if (this.action == "Update") {
      console.log(this.profileForm.value);
      this.employerService
        .updateProfile(this.profileForm.value)
        .subscribe((res) => {
          console.log(res);
          this.getEmployer();
        });

      this.toastr.success("Profile updated", "Success");
    }
    this.modalService.dismissAll();
  }
  getEmployer() {
    this.employerService.getEmployerById().subscribe((res: any) => {
      res.dateOfBirth = this.datePipe.transform(res.dateOfBirth, 'dd-MM-yyyy');
      // res.dateOfBirth = this.dob;
      console.log(res.dateOfBirth)
      this.employerArray = res
    });
  }
  dob: any;
  employerProfile() {
    this.employerService.getEmployerById().subscribe((res: any) => {
      console.log(res);
      this.employerArray = res;
      console.log(this.employerArray);
      this.jobSeekerProfile = res;
      this.dob = this.datePipe.transform(res.dateOfBirth, "dd-MM-yyyy");
      console.log(this.dob);
      this.profileForm = this.formBuilder.group({
        companyName: [res.companyName, [Validators.required]],
        firstName: [res.firstName, [Validators.required]],
        lastName: [res.lastName, [Validators.required]],
        contactNumber: [res.contactNumber, [Validators.required]],
        dateOfBirth: [formatDate(this.dob, "yyyy-MM-dd", "en")],
        about: [res.about, [Validators.required]],
      });
    });
  }

  constructor(
    private modalService: NgbModal,
    private employerService: EmployerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private localStorage: LocalStorage,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private profileService: BlobService,
    private imageService: NgxPhotoEditorService
  ) { }

  ngOnInit(): void {
    this.email = this.authService.getEmail(this.accessToken);
    this.employerProfile();
    this.getEmployer();
    this.getProfilePicture();
  }
}
