import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/data/models/job.model';
import { JobService } from 'src/app/data/services/job.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';
import { AuthService } from "src/app/data/services/auth.service";
import { ToastrService } from 'ngx-toastr';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';
import { FilterService } from 'src/app/data/services/filter.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styles: [
  ]
})
export class JobInfoComponent implements OnInit, AfterContentInit {

  job!: Job;
  isJobSeeker!: boolean;
  jobId!: number;
  isApplied!: boolean;
  isJobLoaded = false;
  currentJob!: any;
  today = new Date();
  profile_sas_token = environment.profile_sas_token;

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private appliedJobService: AppliedJobService,
    private filterService: FilterService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    console.log(this.today)
    const postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId']
    this.getJobById();
    this.getJobMinimal();
    const role = this.authService.getRole();
    if (role == 'Employer') this.isJobSeeker = false;
    else if (role == 'JobSeeker') {
      this.isJobSeeker = true;
      // this.appliedJobService.isApplied(postJobDetailId).subscribe({
      //   next: (data: any) => this.isApplied = data.status   
      // })
    }
  }

  ngAfterContentInit(): void {
  }

  getJobById() {
    const postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId']
    this.jobId = postJobDetailId;
    this.jobService.getJobById(postJobDetailId).subscribe({
      next: data => {
        this.job = data;
        // console.log(this.job);
        this.isJobLoaded = true;
      }
    });
  }

  getJobMinimal() {
    this.filterService.getJobMinimal().subscribe(res => this.getjobfromJobMinimal(res))
  }

  getjobfromJobMinimal(jobList: Job[]) {
    const postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId']
    console.log(jobList)
    for (var i = 0; i < jobList.length; i++) {
      console.log(jobList[i].postJobDetailId)
      if (jobList[i].postJobDetailId == postJobDetailId) {
        console.log(jobList[i])
        this.currentJob = jobList[i];
        console.log(this.currentJob)
        break;
      }
    }
  }

  deleteJob() {
    this.jobService.deleteJob(this.jobId).subscribe({
      next: data => {
        this.router.navigateByUrl('/employer/jobs')
        this.toastr.success(`${this.job.jobTitle} job deleted`);
      }
    });
  }

  applyForJob() {
    this.spinner.show();
    if (this.job.postJobDetailId) {
      this.appliedJobService.applyJob(this.job.postJobDetailId).subscribe({
        next: data => {
          this.spinner.hide();
          this.toastr.success('Applied');
          this.isApplied = true;
        }
      });
    }
  }

}
