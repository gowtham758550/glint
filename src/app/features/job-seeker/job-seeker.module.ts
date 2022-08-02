import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { AppliedJobComponent } from './Components/applied-job/applied-job.component';
import { JobsList } from './Data/jobList';




@NgModule({
  declarations: [
    DashboardComponent,
    AppliedJobComponent
  ],
  imports: [
    CommonModule,
    JobSeekerRoutingModule,
    SharedModule,
    ScrollPanelModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MessageModule,
    MessagesModule,
    ToastModule
  ]
})
export class JobSeekerModule { }
