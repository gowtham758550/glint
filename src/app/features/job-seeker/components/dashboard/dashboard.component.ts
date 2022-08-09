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
  filteredJobs!: Job[];
  locations = ['Bangalore', 'Coimbatore', 'Chennai', 'Kolkata', 'Mumbai']
  experiences = ['Experienced', 'Fresher']
  filteredLocations: string[] = [];
  filteredExperience: string[] = [];

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.getAllJob();
  }

  getAllJob() {
    this.filterService.getAllJobs().subscribe({
      next: (data:Job[]) => {
        this.allJobs = data;
        this.filteredJobs = data;
      }
    });
  }

  applyFilters() {
    if (this.filteredExperience.length > 0 || this.filteredLocations.length > 0) {
      this.filteredJobs = this.allJobs.filter(job => {
        const experience = job.experienceNeeded > 0 ? 'Experienced' : 'Fresher';
        return this.filteredExperience.includes(experience) && this.filteredLocations.includes(job.location);
      })
    } else {
      this.filteredJobs = this.allJobs;
    }
    console.log(this.filteredJobs);
  }

  clearFilters() {
    this.filteredExperience = [];
    this.filteredLocations = [];
  }
}