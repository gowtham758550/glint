import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { ToastrService } from 'ngx-toastr';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { FormField } from 'src/app/data/models/form-field.model';
import { BlobService } from 'src/app/data/services/blob.service';
import { EmployerService } from 'src/app/data/services/employer.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styles: [
  ]
})
export class CompanyDetailComponent implements OnInit {
  isImageLoaded = true;
  imageUrl: string = "assets/PNG/company.png";
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
      type: 'input',
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
    private toastr: ToastrService,
    private profileService: BlobService,
    private imageService: NgxPhotoEditorService,
  ) { }

  ngOnInit(): void {
    // this.getProfilePicture();

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
        console.log(data)
        let file: any = data.file;
        let formData: FormData = new FormData();
        formData.append("profilePicture", file, file.name);
        this.profileService.addProfilePicture(formData).subscribe({
          next: (_data) => {
            console.log("success");
            this.getProfilePicture();
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
      error(err) {
        
      },
    });
  }

  recieveFormData() {
    // console.log(this.profileForm.value);
    this.employerService.updateEmployerProfile(this.profileForm.value).subscribe({
      next: data => {
        this.localStorage.removeItem('accessToken')
        this.toastr.success('Registeration completed successfully');
        this.router.navigateByUrl(RouteConstants.employerLogin);
      }
    });
  }

}
