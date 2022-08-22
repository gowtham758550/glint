import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProfileComponent } from './components/profile/profile.component';

import { RegisterComponent } from './components/register/register.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { JobInfoComponent } from 'src/app/features/job-seeker/components/job-info/job-info.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobSeekerGuard } from 'src/app/core/guards/job-seeker.guard';
import { LoginComponent } from './components/login/login.component';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { Title } from 'src/app/data/enums/constatnts/title.constants';

const routeConstants = RouteConstants;

const routes: Routes = [
  {
    path: 'job-seeker/login',
    component: LoginComponent,
    title: Title.login,
    // canActivate: [JobSeekerGuard]
  },
  {
    path: 'job-seeker/signup',
    component: RegisterComponent,
    title: Title.signup,
    // canActivate: [JobSeekerGuard],
    children: [
      {
        path: '',
        component: SignupComponent,
        title: Title.signup
        // canActivate: [AuthGuard]
      },
      {
        path: 'personal-information',
        component: PersonalInfoComponent,
        title: Title.jobSeekerPersonalInformation
      },
      {
        path: 'verify-account',
        component: VerifyComponent,
        title: Title.accoutVerification
      }
    ]
  },
  {
    path: 'job-seeker',
    component: HomeComponent,
    canActivate: [JobSeekerGuard],
    children: [
      {
        path: 'home',
        component: JobsComponent,
        title: Title.jobSeekerHome
      },
      {
        path: 'my-jobs',
        component: MyJobsComponent,
        title: Title.jobSeekerMyJobs
      },
      {
        path: 'job/:postJobDetailId',
        component: JobInfoComponent,
        title: Title.jobInfo
      },
      {
        path:'profile',
        component: ProfileComponent,
        title: Title.profile
      },
      {
        path:'account-settings',
        component: AccountSettingsComponent,
        title: Title.accountSettings
      },
      {
        path:'applied-jobs',
        component: MyJobsComponent,
        title: Title.jobSeekerAppliedJobs
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
  exports: [RouterModule]
})
export class JobSeekerRoutingModule { }
