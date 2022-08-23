import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

import { FormField } from "src/app/data/models/form-field.model";
import { AuthService } from "src/app/data/services/auth.service";
import { EmployerService } from "src/app/data/services/employer.service";
import { LocalStorage } from "src/app/data/services/local-storage.service";
import { DatePipe } from "@angular/common";
import { NgxPhotoEditorService } from "ngx-photo-editor";
import { BlobService } from "src/app/data/services/blob.service";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-employer-profile",
  templateUrl: "employer-profile.component.html",
  styleUrls: ["employer-profile.component.css"],
})
export class EmployerProfileComponent implements OnInit {
  backgroundImage: string = "/assets/defaultCoverPicture.jpg";
  isImageLoaded = false;
  isCoverImageLoaded = false;
  imageUrl: string = "/assets/defaultProfilePicture.png";

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
      type: "textarea",
      label: "About",
      formControlName: "about",
      class: ["w"],
    },
  ];
  action!: string;
  jobSeekerProfile: any;

  openFileTrigger(component: HTMLElement) {
    component.click();
  }
  openCoverPictureTrigger(component: HTMLElement) {
    component.click();
  }
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
        if (data != null) {
          this.spinner.show();
        }
        let file: any = data.file;
        let formData: FormData = new FormData();
        formData.append("profilePicture", file, file.name);
        this.profileService.addProfilePicture(formData).subscribe({
          next: (_data) => {
            this.toastr.success("Profile Picture Updated");
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
          // this.spinner.hide();
        }
        this.isImageLoaded = true;
      },
    });
  }

  // -----------------------------------------Cover Picture-----------------------------------------
  updateCoverPicture($event: any) {
    this.imageService
      .open($event, {
        aspectRatio: 20 / 4,
        autoCrop: true,
        autoCropArea: 1,
        viewMode: 1,
      })
      .subscribe((data: any) => {
        if (data != null) {
          this.spinner.show();
        }
        let file: any = data.file;
        let formData: FormData = new FormData();
        formData.append("coverPicture", file, file.name);
        this.profileService.addCoverPicture(formData).subscribe({
          next: (_data) => {
            this.toastr.success("Cover Picture Updated");
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
        if (data.url) {
          let res = data.url;
          this.backgroundImage = res + "?" + environment.cover_sas_token;
        }
        this.isCoverImageLoaded = true;
        this.spinner.hide();
      },
    });
  }
  // ----------------------------------------Update Profile operation----------------------------------
  updateProfile(ref: any) {
    this.spinner.show();
    this.action = "Update";
    this.modalService.open(ref).result.then((result) => {});
    this.spinner.hide();
  }
  executeProfileAction() {
    if (this.action == "Update") {
      this.employerService
        .updateProfile(this.profileForm.value)
        .subscribe((res) => {
          this.getEmployer();
        });

      this.toastr.success("Profile updated", "Success");
    }
    this.modalService.dismissAll();
  }
  getEmployer() {
    this.employerService.getEmployerById().subscribe((res: any) => {
      res.dateOfBirth = this.datePipe.transform(res.dateOfBirth, "dd-MM-yyyy");
      // res.dateOfBirth = this.dob;
      this.employerArray = res;
    });
  }
  dob: any;
  employerProfile() {
    this.employerService.getEmployerById().subscribe((res: any) => {
      this.employerArray = res;
      this.jobSeekerProfile = res;
      this.dob = this.datePipe.transform(res.dateOfBirth, "dd-MM-yyyy");
      this.profileForm = this.formBuilder.group({
        companyName: [res.companyName, [Validators.required]],
        firstName: [res.firstName, [Validators.required]],
        lastName: [res.lastName, [Validators.required]],
        contactNumber: [res.contactNumber, [Validators.required]],
        dateOfBirth: [formatDate(res.dateOfBirth, "yyyy-MM-dd", "en")],
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
    private imageService: NgxPhotoEditorService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.email = this.authService.getEmail();
    this.employerProfile();
    this.getEmployer();
    this.getProfilePicture();
    this.getCoverPicture();
  }
}
