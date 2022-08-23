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
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { ViewJobComponent } from './components/view-job/view-job.component';
import { AccountSettingsEmployerComponent } from './components/account-settings-employer/account-settings-employer.component';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { JobSeekerProfileComponent } from './components/job-seeker-profile/job-seeker-profile.component';
import { JobCardsComponent } from './components/job-cards/job-cards.component';
import { EmployerGuard } from 'src/app/core/guards/employer.guard';
import { LoginComponent } from './components/login/login.component';
import { Title } from 'src/app/data/enums/constatnts/title.constants';

const routes: Routes = [
  {
    path: 'employer/signup',
    component: RegisterComponent,
    // canActivate: [EmployerGuard],
    children: [
      {
        path: '',
        component: SignupComponent,
        title: Title.signup,
        canActivate: [AuthGuard]
      },
      {
        path: 'verify-account',
        component: VerifyComponent,
        title: Title.accoutVerification
      },
      {
        path: 'company-detail',
        component: CompanyDetailComponent,
        title: Title.employerCompanyDetail
      }
    ]
  },
  {
    path: 'employer/login',
    component: LoginComponent,
    title: Title.login
  },
  {
    path: 'employer',
    component: HomeComponent,
    canActivate: [EmployerGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: Title.employerDashboard
      },
      {
        path: 'jobs',
        component: JobsComponent,
        title: Title.employerManageJobs
      },
      {
        path: 'job/new',
        component: NewJobComponent,
        title: Title.employerNewJob
        // canDeactivate:[pendingChangesGuard]  
      },
      {
        path: 'job/:postJobDetailId',
        component: ViewJobComponent,
        title: Title.jobInfo
      },
      {
        path: 'job/edit/:postJobDetaiId',
        component: EditJobComponent
      },
      {
        path: 'account-settings',
        component: AccountSettingsEmployerComponent,
        title: Title.accountSettings
      },
      {
        path: 'profile',
        component: EmployerProfileComponent,
        title: Title.profile
      },
      {
        path: 'job-seeker/profile/:jobSeekerId/:jobId',
        component: JobSeekerProfileComponent,
        title: Title.jobSeekerProfile
      },
      {
        path: 'view-applicants',
        component: JobCardsComponent,
        title: Title.employerViewApplications
      }
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'not-found'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule { }
