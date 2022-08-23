import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Option } from "src/app/data/models/options.model";
import { Router } from "@angular/router";
import { FilterService } from "src/app/data/services/filter.service";
import { JobService } from "src/app/data/services/job.service";
import { RouteConstants } from "src/app/data/enums/constatnts/route.constants";
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from "src/app/data/services/data.service";
import { JobCategory } from "src/app/data/models/job-category.model";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
})
export class LandingPageComponent implements OnInit {
  jobSearchList: string[] = [];
  routeConstants = RouteConstants;
  isLoggedIn!: boolean;
  totalJobCount!: number;
  totalCompanyCount!: number;
  jobSeekerCount!: number;
  designations = this.jobService.jobs;
  location: Option[] = [
    {
      value: 0,
      label: "Select location",
    },
    {
      value: 1,
      label: "Bangalore",
    },
    {
      value: 2,
      label: "Chennai",
    },
    {
      value: 3,
      label: "Coimbatore",
    },
    {
      value: 4,
      label: "Kolkata",
    },
    {
      value: 5,
      label: "Mumbai",
    },
  ];
  isLocationPlaceholder = true;
  experience: Option[] = [
    {
      value: 0,
      label: "Select experience",
    },
    {
      value: 1,
      label: "Fresher",
    },
    {
      value: 2,
      label: "Experienced",
    },
  ];
  isExperiencePlaceholder = true;
  searchBarForm: FormGroup = this.formBuilder.group({
    designation: "",
    experience: 0,
    location: 0,
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private filterService: FilterService,
    private jobService: JobService,
    private spinner: NgxSpinnerService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getTotalJobCount();
    this.getEmployerCount();
    this.getJobSeekerCount();
    this.getJobCategories();
  }

  getJobCategories() {
    this.dataService.getJobCategories().subscribe({
      next: (data) =>
        data.forEach((val) => {
          this.jobSearchList.push(val.jobTitle.charAt(0).toUpperCase() + val.jobTitle.slice(1));
        }),
    });
  }
  getDesignations() {
    this.jobService.getAllJob().subscribe();
  }

  getTotalJobCount() {
    this.filterService.getPostJobCount().subscribe({
      next: (data) => (this.totalJobCount = data),
    });
  }

  getEmployerCount() {
    this.filterService.getEmployerCount().subscribe({
      next: (data) => (this.totalCompanyCount = data),
    });
  }

  getJobSeekerCount() {
    this.filterService.getJobSeekerCount().subscribe({
      next: (data) => {
        this.jobSeekerCount = data;
        this.spinner.hide();
      },
    });
  }

  search() {
    this.router.navigate([this.routeConstants.jobSeekerHome], {
      queryParams: this.searchBarForm.value,
    });
  }

  onLocationChange(event: any) {
    if (event.target.value == 0) this.isLocationPlaceholder = true;
    else this.isLocationPlaceholder = false;
  }

  onExperienceChnage(event: any) {
    if (event.target.value == 0) this.isExperiencePlaceholder = true;
    else this.isExperiencePlaceholder = false;
  }
}
