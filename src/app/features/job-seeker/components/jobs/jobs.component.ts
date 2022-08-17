import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from "src/app/data/enums/location.enum";
import { Experience } from "src/app/data/models/experience.enum";
import { Job } from "src/app/data/models/job.model";
import { FilterService } from "src/app/data/services/filter.service";
import { RouteConstants } from "src/app/data/enums/constatnts/route.constants";

@Component({
  selector: "app-job-seeker-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.css"],
})
export class JobsComponent implements OnInit {
  routeConstants = RouteConstants;
  isLoaded = false;
  allJobs!: Job[];
  filteredJobs!: Job[];
  locations = ["Bangalore", "Coimbatore", "Chennai", "Kolkata", "Mumbai"];
  experiences = ["Experienced", "Fresher"];
  filteredLocations: string[] = [];
  filteredExperience: string[] = [];
  searchText: string = "";

  constructor(
    private filterService: FilterService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getAllJob();
    this.getJobs();
  }

  getJobs() {
    console.log("started");
    let filters: string[] = [];
    this.filteredLocations = [];
    this.filteredExperience = [];
    console.log("started");
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length != 0) {
        filters.push(`jobTitle@=*${params.designation}`);
        this.searchText = params.designation;
        // experience
        if (typeof params.experience == "string" && params.experience != 0) {
          this.filteredExperience = [Experience[params.experience]];
          if (params.experience == 1) {
            filters.push("experienceNeeded==0");
          } else if (params.experience == 2) {
            filters.push("experienceNeeded>0");
          }
        } else if (typeof params.experience == "object") {
          console.log(params.experience);
          params.experience.forEach((e: any) => {
            this.filteredExperience.push(Experience[e]);
          });
          filters.push("experienceNeeded>=0");
        }

        // location
        if (typeof params.location == "string" && params.location != 0) {
          this.filteredLocations = [Location[params.location]];
          filters.push(`location==${Location[params.location]}`);
        } else if (typeof params.location == "object") {
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
      next: (data) => {
        this.allJobs = data;
        this.isLoaded = true;
      },
    });
  }

  applyFilters() {
    this.router.navigateByUrl(this.routeConstants.jobSeekerHome);
    this.isLoaded = false;
    // console.log(this.filteredExperience, this.filteredLocations);
    let updatedParams = "";
    let updatedFilter: string[] = [];
    let _filteredExperience = [...new Set(this.filteredExperience)];
    let _filteredLocation = [...new Set(this.filteredLocations)];
    updatedParams += `designation=${this.searchText}&`;
    updatedFilter.push(`jobTitle@=*${this.searchText}`);
    console.log(updatedParams);
    if (_filteredExperience.length > 0) {
      let experienceCount: any = 0;
      _filteredExperience.forEach((e: any) => {
        experienceCount += Experience[e];
        updatedParams += `experience=${Experience[e]}&`;
      });
      // experienceCount = this.filteredExperience.at(
      //   this.filteredExperience.length - 1
      // );
      if (experienceCount == 1) {
        updatedFilter.push(`experienceNeeded==0`);
      } else if (experienceCount > 1) {
        updatedFilter.push(`experienceNeeded>0`);
      }
    }
    if (_filteredLocation.length > 0) {
      let tempLocation: string[] = [];
      _filteredLocation.forEach((e: string) => {
        updatedParams += `location=${e}&`;
        tempLocation.push(e);
      });
      updatedFilter.push(`location==${tempLocation.toString()}`);
    }
    this.router.navigateByUrl(
      `${this.routeConstants.jobSeekerHome}?${updatedParams.slice(0, -1)}`
    );

    console.log("=--=-=-=-=",updatedFilter.toString());

    this.filterService.getNonAppliedJobs(updatedFilter.toString()).subscribe({
      next: (data) => {
        this.allJobs = data;
        this.isLoaded = true;
      },
    });
  }

  clearFilters() {
    this.isLoaded = false;
    this.filteredExperience = [];
    this.filteredLocations = [];
    this.router.navigateByUrl(this.routeConstants.jobSeekerHome);
    this.filterService.getNonAppliedJobs("").subscribe({
      next: (data) => {
        this.allJobs = data;
        this.isLoaded = true;
      },
    });
  }

  search() {}
}
