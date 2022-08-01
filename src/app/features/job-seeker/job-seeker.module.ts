import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    JobSeekerRoutingModule,
    SharedModule,
    ScrollPanelModule
  ]
})
export class JobSeekerModule { }
