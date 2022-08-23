import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineModule } from 'primeng/timeline';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPhotoEditorModule } from "ngx-photo-editor";
import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { DataModule } from 'src/app/data/data.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobInfoComponent } from './components/job-info/job-info.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    PersonalInfoComponent,
    SignupComponent,
    VerifyComponent,
    ProfileComponent,
    AccountSettingsComponent,
    MyJobsComponent,
    JobsComponent,
    LoginComponent,
    JobInfoComponent
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
    NgxPhotoEditorModule,
    DividerModule,
    TimelineModule,
    PasswordModule,
    PaginatorModule,
    TooltipModule,
    CardModule,
    ChipsModule,
    ChipModule,
    ScrollPanelModule,
    PdfViewerModule,
    PaginatorModule
  ]
})
export class JobSeekerModule { }
