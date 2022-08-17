import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { Status } from 'src/app/data/enums/status.enum';
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
  isTimeline = true;
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
        this.getTimeline(0);
      }
    })
  }

  getTimeline(index: number) {
    this.jobTimeline = [
        {jobTitle: this.myJobs[index].jobTitle, status: 'Applied', date: new Date(this.myJobs[index].appliedOn).toDateString(), icon: PrimeIcons.BOOK },
        {status: this.myJobs[index].jobStatus, date: new Date(this.myJobs[index].modifiedOn).toDateString(), icon: this.myJobs[index].jobStatus == Status.Pending ? PrimeIcons.CLOCK : PrimeIcons.CHECK_CIRCLE},
    ];
  }

}
