import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProfileComponent } from './components/profile/profile.component';

import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
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
        path:'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'search',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: SearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule { }
