import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { ToastrService } from 'ngx-toastr';
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
  imageUrl: string = "https://cdn-icons-png.flaticon.com/512/1077/1077012.png?w=360";
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
    private router: Router,
    private toastr: ToastrService,
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

  recieveFormData() {
    // console.log(this.profileForm.value);
    this.employerService.updateEmployerProfile(this.profileForm.value).subscribe({
      next: data => {
        this.localStorage.removeItem('accessToken')
        this.toastr.success('Registeration completed successfully');
        this.router.navigateByUrl('/login');
      }
    });
  }

}
