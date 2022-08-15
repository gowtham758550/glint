import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { KnobModule } from 'primeng/knob';
import { NgxEchartsModule } from 'ngx-echarts';

import { EmployerRoutingModule } from './employer-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { VerifyComponent } from './components/verify/verify.component';
import { NewJobComponent } from './components/new-job/new-job.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { ViewJobComponent } from './components/view-job/view-job.component';
import { AccountSettingsEmployerComponent } from './components/account-settings-employer/account-settings-employer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { DatePipe } from '@angular/common';
import { JobSeekerProfileComponent } from './components/job-seeker-profile/job-seeker-profile.component'
import { DividerModule } from "primeng/divider";
import { PasswordModule } from "primeng/password";
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import {TooltipModule} from 'primeng/tooltip';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { BadgeModule } from "primeng/badge";
import { JobCardsComponent } from './components/job-cards/job-cards.component';
// import { AllApplicantsComponent } from './components/all-applicants/all-applicants.component';



@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    SignupComponent,
    CompanyDetailComponent,
    VerifyComponent,
    NewJobComponent,
    JobsComponent,
    EditJobComponent,
    ViewJobComponent,
    AccountSettingsEmployerComponent,
    EmployerProfileComponent,
    JobSeekerProfileComponent,
    JobCardsComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    TableModule,
    NgxPhotoEditorModule,
    SkeletonModule,
    KnobModule,
    DividerModule,
    PasswordModule,
    TooltipModule,
    BadgeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [DatePipe, JobSeekerService]
})
export class EmployerModule { }
