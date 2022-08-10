import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

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
import { AccountSettingsEmployerComponent } from './components/account-settings-employer/account-settings-employer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { DatePipe } from '@angular/common'



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
    AccountSettingsEmployerComponent,
    EmployerProfileComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule
  ],
  providers: [DatePipe]
})
export class EmployerModule { }
