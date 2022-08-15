import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyComponent } from '../job-seeker/components/verify/verify.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './components/register/register.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: 'employer/signup',
    component: RegisterComponent,
    children: [
      {
        path: '',
        component: SignupComponent
      },
      {
        path: 'verify-account',
        component: VerifyComponent
      },
      {
        path: 'company-detail',
        component: CompanyDetailComponent
      }
    ]
  },
  {
    path: 'employer',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
