import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDescriptionComponent } from 'src/app/shared/components/job-description/job-description.component';
import { AppliedJobComponent } from './Components/applied-job/applied-job.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path:'appliedJobs', component:AppliedJobComponent},
  {path:'jobDescription/:id', component:JobDescriptionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule { }
