import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerModule } from './employer/employer.module';
import { JobSeekerModule } from './job-seeker/job-seeker.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EmployerModule,
    JobSeekerModule
  ]
})
export class FeaturesModule { }
