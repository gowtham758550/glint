import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { AppliedJob } from 'src/app/data/models/applied-job.model';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styles: [
  ]
})
export class MyJobsComponent implements OnInit {

  routeConstants = RouteConstants;
  myJobs!: AppliedJob[];
  sasToken = environment.profile_sas_token;
  isTimeline = false;
  isAppliedJobLoaded = false;
  jobTimeline: any

  constructor(
    private appliedJobService: AppliedJobService
  ) { }
  
  ngOnInit() {
    this.getMyJobs();
  }

  getMyJobs() {
    this.appliedJobService.getAppliedJobs().subscribe({
      next: data => {
        this.myJobs = data;
        this.isAppliedJobLoaded = true;
      }
    })
  }

  getTimeline(index: number) {
    this.isTimeline = true;
    this.jobTimeline = [
        {jobTitle: this.myJobs[index].jobTitle, status: 'Applied', date: this.myJobs[index].appliedOn, icon: PrimeIcons.BOOK },
        {status: this.myJobs[index].jobStatus, date: this.myJobs[index].modifiedOn, icon: PrimeIcons.CLOCK},
    ];
  }

}
