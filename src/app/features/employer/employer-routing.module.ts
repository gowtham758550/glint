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
import { pendingChangesGuard } from 'src/app/core/guards/pendingChanges.guard';
import { Title } from 'src/app/data/enums/constatnts/title.constants';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';

const routes: Routes = [
  {
    path: 'employer/signup',
    component: RegisterComponent,
    // canActivate: [EmployerGuard],
    children: [
      {
        path: '',
        component: SignupComponent,
        // canActivate: [AuthGuard]
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
    component: LoginComponent
  },
  {
    path: 'employer',
    component: HomeComponent,
    canActivate: [EmployerGuard],
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
        component: NewJobComponent,
        // canDeactivate:[pendingChangesGuard]  
      },
      {
        path: 'job/:postJobDetailId',
        component: ViewJobComponent
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
      },
      {
        path: 'job-seeker/profile/:jobSeekerId/:jobId',
        component: JobSeekerProfileComponent
      },
      {
        path: 'view-applicants',
        component: JobCardsComponent
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
