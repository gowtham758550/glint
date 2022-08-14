import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from 'src/app/data/enums/location.enum';
import { Experience } from 'src/app/data/enums/experience.enum';
import { Job } from 'src/app/data/models/job.model';
import { FilterService } from 'src/app/data/services/filter.service';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { filter } from 'rxjs';

@Component({
  selector: 'app-job-seeker-jobs',
  templateUrl: './jobs.component.html', 
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  routeConstants = RouteConstants;
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.getAllJob();
    this.getJobs();
  }

  getJobs() {
    console.log('started');
    let filters: string[] = [];
    this.filteredLocations = [];
    this.filteredExperience = [];
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length != 0) {

        // experience
        if (typeof params.experience == 'string' && params.experience != 0) {
          this.filteredExperience = [Experience[params.experience]];
          if (params.experience == 1) {
            filters.push('experienceNeeded==0');
          } else if (params.experience == 2) {
            filters.push('experienceNeeded>0');
          }
        } else if (typeof params.experience == 'object') {
          console.log(params.experience);
          params.experience.forEach((e: any) => {
            this.filteredExperience.push(Experience[e]);
          });
          filters.push('experienceNeeded>=0');
        }

        // location
        if (typeof params.location == 'string' && params.location != 0) {
          this.filteredLocations = [Location[params.location]];
          filters.push(`location==${Location[params.location]}`);
        } else if (typeof params.location == 'object') {
          let tempLocation: string[] = [];
          params.location.forEach((e: any) => {
            this.filteredLocations.push(Location[e]);
            tempLocation.push(Location[e]);
          });
          filters.push(`location==${tempLocation.toString()}`);
        }
      }
    });

    this.filterService.getNonAppliedJobs(filters.toString()).subscribe({
      next: data => {
        this.allJobs = data;
        this.isLoaded = true;
      }
    });
  }

  applyFilters() {
    console.log(this.filteredExperience, this.filteredLocations);
    let updatedFilters = '';
    if (this.filteredExperience.length > 0) {
      this.filteredExperience.forEach((e: any) => {
        updatedFilters += `experience=${Experience[e]}&`
      });
    }
    if (this.filteredLocations.length > 0) {
      this.filteredLocations.forEach((e: any) => {
        updatedFilters += `location=${Location[e]}&`
      });
    }
    this.filteredExperience = [];
    this.filteredLocations = [];
    this.router.navigateByUrl(`${this.routeConstants.jobSeekerHome}?${updatedFilters.slice(0, -1)}`);
    this.isLoaded = false;
    this.getJobs();
  }

  clearFilters() {
    this.filteredExperience = [];
    this.filteredLocations = [];
  }

  search() {
    
  }
}
