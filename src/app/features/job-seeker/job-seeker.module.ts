import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ButtonModule } from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import { DataModule } from 'src/app/data/data.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    PersonalInfoComponent,
    SignupComponent,
    VerifyComponent,
    SearchComponent,
    ProfileComponent
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
    FormsModule
  ]
})
export class JobSeekerModule { }
