import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { DataModule } from 'src/app/data/data.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';


@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    PersonalInfoComponent,
    SignupComponent,
    VerifyComponent,
    SearchComponent,
    ProfileComponent,
    AccountSettingsComponent,
    DashboardComponent,
    AppliedJobsComponent
  ],
  imports: [
    CommonModule,
    JobSeekerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
    DataModule,
    NgbModule,
    FormsModule,
    DialogModule,
    AccordionModule,
    CheckboxModule,
    SkeletonModule,
    NgxPhotoEditorModule
  ]
})
export class JobSeekerModule { }
