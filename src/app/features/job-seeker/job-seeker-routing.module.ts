import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';

import { RegisterComponent } from './components/register/register.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';

const routes: Routes = [
  {
    path: 'job-seeker/signup',
    component: RegisterComponent,
    children: [
      {
        path: '',
        component: SignupComponent
      },
      {
        path: 'personal-information',
        component: PersonalInfoComponent
      },
      {
        path: 'verify-account',
        component: VerifyComponent
      }
    ]
  },
  {
    path: 'job-seeker',
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
export class JobSeekerRoutingModule { }
