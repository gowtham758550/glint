import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/data/models/job.model';
import { JobService } from 'src/app/data/services/job.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';
import { AuthService } from "src/app/data/services/auth.service";
import { ToastrService } from 'ngx-toastr';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';
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

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private appliedJobService: AppliedJobService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit(): void {
    const postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId']
    this.getJobById();
    const role = this.authService.getRole();
    if (role == 'Employer') this.isJobSeeker = false;
    else if (role == 'JobSeeker') {
      this.isJobSeeker = true;
      this.appliedJobService.isApplied(postJobDetailId).subscribe({
        next: (data: any) => this.isApplied = data.status   
      })
    }
  } 

  ngAfterContentInit(): void {
  }

  getJobById() {
    const postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId']
    this.jobId = postJobDetailId;
    this.jobService.getJobById(postJobDetailId).subscribe({
      next: data => this.job = data
    });
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
