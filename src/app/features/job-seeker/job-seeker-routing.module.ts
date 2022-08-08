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
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'job-seeker/signup',
    component: RegisterComponent,
    children: [
      {
        path: '',
        component: SignupComponent,
        canActivate: [AuthGuard]
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
      },
      {
        path:'profile',
        component: ProfileComponent
      },
      {
        path:'account-settings',
        component: AccountSettingsComponent
      }
    ]
  },
  // {
  //   path: 'dashboard',
  //   component: HomeComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: SearchComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule { }
