import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { ChipsModule } from 'primeng/chips';
import { StepperComponent } from './components/stepper/stepper.component';
import { FormComponent } from './components/form/form.component';
import { LogoComponent } from './components/logo/logo.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { JobInfoComponent } from './components/job-info/job-info.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationComponent } from '../core/components/confirmation/confirmation.component';
import { LoginTemplateComponent } from './components/login-template/login-template.component';

@NgModule({
  declarations: [
    FormComponent,
    LogoComponent,
    StepperComponent,
    SignupComponent,
    VerifyComponent,
    JobCardComponent,
    JobInfoComponent,
    LayoutComponent,
    LoginTemplateComponent,
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
    StepsModule,
    ChipsModule,
    ModalModule.forRoot()
  ],
  exports: [
    FormComponent,
    LogoComponent,
    StepperComponent,
    SignupComponent,
    VerifyComponent,
    JobCardComponent,
    JobInfoComponent,
    LayoutComponent,
    LoginTemplateComponent,
  ],
  entryComponents: [ConfirmationComponent] 
})
export class SharedModule { }
