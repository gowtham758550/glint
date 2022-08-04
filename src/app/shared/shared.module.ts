import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown'
import { StepperComponent } from './components/stepper/stepper.component';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { StepsModule } from 'primeng/steps';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { JobInfoComponent } from './components/job-info/job-info.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    FormComponent,
    LogoComponent,
    StepperComponent,
    DashboardComponent,
    SignupComponent,
    VerifyComponent,
    JobCardComponent,
    JobInfoComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StepsModule
  ],
  exports: [
    SearchBarComponent,
    FormComponent,
    LogoComponent,
    StepperComponent,
    DashboardComponent,
    SignupComponent,
    VerifyComponent,
    JobCardComponent,
    JobInfoComponent
  ]
})
export class SharedModule { }
