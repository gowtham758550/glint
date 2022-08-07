import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyComponent } from './components/verify/verify.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './components/register/register.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

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
