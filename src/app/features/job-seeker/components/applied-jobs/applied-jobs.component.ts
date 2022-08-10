import { Component, OnInit } from '@angular/core';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';
import { PostJobService } from 'src/app/data/services/post-job.service';
import { JobsComponent } from 'src/app/features/employer/components/jobs/jobs.component';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: 'applied-jobs.component.html',
  styles: [
  ]
})
export class AppliedJobsComponent implements OnInit {
  appliedJobArray: any[] = [];
  jobIdArray: number[] = [];
  appliedJobDetails: any = [];
  appliedJobStatus:any=[];
  constructor(
    private appliedJobService: AppliedJobService,
    private postJobService: PostJobService
  ) { }

  ngOnInit(): void {
    this.getPostJobId();
  }

  getPostJobId() {
    this.appliedJobService.getAppliedJobId().subscribe(res => {
      this.appliedJobArray = res;
      this.fetchPostJobId(res);
    })
  }
  fetchPostJobId(appliedJobArray: Object) {
    for (var i = 0; i < this.appliedJobArray.length; i++) {
      this.jobIdArray.push(this.appliedJobArray[i].postJobId);
      this.postJobService.getPostJobbyId(this.jobIdArray[i]).subscribe(res => {
        this.appliedJobDetails.push({jobDetail:res, status:this.appliedJobArray[i].status})
      });
    }
    // this.getJobById();
  }


  // getJobById() {
  //   for (var i = 0; i < this.jobIdArray.length; i++) {
  //     // console.log(i);
  //     this.postJobService.getPostJobbyId(this.jobIdArray[i]).subscribe(res => {
  //       this.appliedJobDetails.push({res,})
  //     });
  //     console.log(this.appliedJobDetails)
  //   }
  // }
}
