import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/data/models/job.model';
import { JobService } from 'src/app/data/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styles: [
  ]
})
export class JobsComponent implements OnInit {

  jobs: Job[] = [];
  isLoaded = false;

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getPostedJob().subscribe({
      next: data => {
        this.jobs = data;
        this.isLoaded = true;
      }
    });
  }
}
