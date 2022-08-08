import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/data/models/job.model';
import { JobService } from 'src/app/data/services/job.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';
import { AuthService } from "src/app/data/services/auth.service";

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styles: [
  ]
})
export class JobInfoComponent implements OnInit {

  job!: Job;
  isJobSeeker!: boolean;

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorage,
    private authService: AuthService
  ) { 
  }

  ngOnInit(): void {
    this.getJobById();
    const accessToken = this.localStorage.getItem('accessToken');
    const role = this.authService.getRole(accessToken);
    if (role == 'Employer') this.isJobSeeker = false;
    else if (role == 'JobSeeker') this.isJobSeeker = true;
  }

  getJobById() {
    const postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId']
    this.jobService.getJobById(postJobDetailId).subscribe({
      next: data => this.job = data
    });
  }

}
