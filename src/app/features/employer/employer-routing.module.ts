import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyComponent } from './components/verify/verify.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './components/register/register.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NewJobComponent } from './components/new-job/new-job.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobInfoComponent } from 'src/app/shared/components/job-info/job-info.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { AccountSettingsEmployerComponent } from './components/account-settings-employer/account-settings-employer.component';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';

const routes: Routes = [
  {
    path: 'employer/signup',
    component: RegisterComponent,
    children: [
      {
        path: '',
        component: SignupComponent,
        canActivate: [AuthGuard]
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
    path: 'employer/login',
    component:LoginComponent
  },
  {
    path: 'employer',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'jobs',
        component: JobsComponent
      },
      {
        path: 'job/new',
        component: NewJobComponent
      },
      {
        path: 'job/:postJobDetailId',
        component: JobInfoComponent
      },
      {
        path: 'job/edit/:postJobDetaiId',
        component: EditJobComponent
      },
      {
        path: 'account-settings',
        component: AccountSettingsEmployerComponent
      },
      {
        path: 'profile',
        component: EmployerProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
