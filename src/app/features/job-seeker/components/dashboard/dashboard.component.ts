import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/data/models/job.model';
import { FilterService } from 'src/app/data/services/filter.service';
import { JobService } from 'src/app/data/services/job.service';

@Component({
  selector: 'app-dashboard-job-seeker',
  templateUrl: './dashboard.component.html', 
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  allJobs!: Job[];

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.getAllJob();
  }

  getAllJob() {
    this.filterService.getAllJobs().subscribe({
      next: (data:Job[]) => this.allJobs = data
    });
  }
}
