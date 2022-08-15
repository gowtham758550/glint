import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { SignupComponent } from './components/signup/signup.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { VerifyComponent } from './components/verify/verify.component';


@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    SignupComponent,
    CompanyDetailComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule,
    ButtonModule
  ]
})
export class EmployerModule { }
