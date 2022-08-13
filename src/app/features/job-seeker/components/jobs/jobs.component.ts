import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from 'src/app/data/enums/location.enum';
import { Experience } from 'src/app/data/models/experience.enum';
import { Job } from 'src/app/data/models/job.model';
import { FilterService } from 'src/app/data/services/filter.service';

@Component({
  selector: 'app-job-seeker-jobs',
  templateUrl: './jobs.component.html', 
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  isLoaded = false;
  allJobs!: Job[];
  filteredJobs!: Job[];
  locations = ['Bangalore', 'Coimbatore', 'Chennai', 'Kolkata', 'Mumbai']
  experiences = ['Experienced', 'Fresher']
  filteredLocations: string[] = [];
  filteredExperience: string[] = [];
  searchText!: string;

  constructor(
    private filterService: FilterService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.getAllJob();
    this.getJobs();
  }

  getJobs() {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      console.log(params)
      if (Object.keys(params).length !== 0) {
        this.filteredExperience.push(Experience[params.experience]);
        this.filteredLocations.push(Location[params.location]);
        this.searchText = params.designation
        const filters = `location==${this.filteredLocations.toString()}&PageSize=10`
        // const filters = `jobTitle==${params.designation},location==${this.filteredLocations.toString()},experience==${this.filteredExperience.toString()}&PageSize=10`
        this.filterService.getAllJobs(filters).subscribe({
          next: data => {
            this.allJobs = data;
            this.isLoaded = true;
          }
        });
      } else {
        const filters = "";
        // const filters = `jobTitle==${params.designation},location==${this.filteredLocations.toString()},experience==${this.filteredExperience.toString()}&PageSize=10`
        this.filterService.getAllJobs(filters).subscribe({
          next: data => {
            this.allJobs = data;
            this.isLoaded = true;
          }
        });
      }
    })
  }

  // getAllJob() {
  //   this.filterService.getAllJobs().subscribe({
  //     next: (data:Job[]) => {
  //       this.allJobs = data;
  //       this.filteredJobs = data;
  //       this.isLoaded = true;
  //     }
  //   });
  // }

  applyFilters() {
    // if (this.filteredExperience.length > 0 || this.filteredLocations.length > 0) {
    //   console.log(this.filteredExperience, this.filteredLocations);
    // } else {
    //   this.filteredJobs = this.allJobs;
    // }
    // console.log(this.filteredJobs);
    this.getJobs();
  }

  clearFilters() {
    this.filteredExperience = [];
    this.filteredLocations = [];
  }

  search() {
    
  }
}
