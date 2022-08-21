import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerModule } from './employer/employer.module';
import { JobSeekerModule } from './job-seeker/job-seeker.module';
import { FeaturesRoutingModule } from './features-routing.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EmployerModule,
    JobSeekerModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
