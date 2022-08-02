import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { EmployerModule } from './employer/employer.module';
import { JobSeekerModule } from './job-seeker/job-seeker.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminModule,
    EmployerModule,
    JobSeekerModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class FeaturesModule { }
