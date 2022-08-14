import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, merge } from 'rxjs';
import { Location } from 'src/app/data/enums/location.enum';
import { Experience } from 'src/app/data/enums/experience.enum';
import { Job } from 'src/app/data/models/job.model';
import { FilterService } from 'src/app/data/services/filter.service';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';

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
    let filters: string[] = [];
    // subscribing query params
    this.activatedRoute.queryParams.subscribe((params:any) => {
      // executes only when url containes query params
      if (Object.keys(params).length !== 0) {
        if (params.experience > 0) {
          this.filteredExperience = [Experience[params.experience]];
          // fresher
          if (params.experience == 1) {
            filters.push('experienceNeeded==0');
          }
          // experienced
          else if (params.experience == 2) {
            filters.push('experienceNeeded>0');
          }
        }
        if (params.location > 0) {
          this.filteredLocations = [Location[params.location]];
          filters.push(`location==${Location[params.location]}`);
        }
        if (params.designation) {
          this.searchText = params.designation;
          filters.push(`jobTitle@=*${params.designation}`);
        }
      }
    });

    // service call with filters
    this.filterService.getNonAppliedJobs(filters.toString()).subscribe({
      next: data => {
        this.allJobs = data;
        this.isLoaded = true;
      }
    });
  }

  applyFilters() {
    let updatedParams = new HttpParams();
    this.filteredExperience.forEach((e: any) => {
      updatedParams.append('experience', Experience[e]);
    })
    console.log(updatedParams.getAll('experience'));
    this.router.navigate(
      [],
      {
        queryParams: updatedParams,
        // queryParamsHandling: 'merge'
      }
    )
    this.getJobs();
  }

  clearFilters() {
    this.filteredExperience = [];
    this.filteredLocations = [];
  }

  search() {
    
  }
}
