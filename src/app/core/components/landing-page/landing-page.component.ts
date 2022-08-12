import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchBar } from 'src/app/data/models/search-bar.model';
import { Option } from 'src/app/data/models/options.model';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/data/services/filter.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: []
})
export class LandingPageComponent implements OnInit {

  isLoggedIn!: boolean;
  totalJobCount!: number;
  totalCompanyCount!: number;
  jobSeekerCount!: number;
  experience: Option[] = [
    {
      value: 0,
      label: 'Select experience'
    },
    {
        value: 1,
        label: 'Fresher'
    },
    {
      value: 2,
      label: 'Experienced'
    }
  ];
  searchBarData: SearchBar[] = [
    {
      label: 'Enter designation',
      type: 'input',
      formControlName: 'designation'
    },
    {
      label: 'Select experience',
      type: 'select',
      options: this.experience,
      formControlName: 'experience'
    },
    {
      label: 'Enter location',
      type: 'input',
      formControlName: 'location'
    }
  ];
  searchBarForm: FormGroup = this.formBuilder.group({
    designation: '',
    experience: 0,
    location: ''
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.getTotalJobCount();
    this.getEmployerCount();
    this.getJobSeekerCount();
  }

  getTotalJobCount() {
    this.filterService.getPostJobCount().subscribe({
      next: data => this.totalJobCount = data
    });
  }

  getEmployerCount() {
    this.filterService.getEmployerCount().subscribe({
      next: data => this.totalCompanyCount = data
    });
  }

  getJobSeekerCount() {
    this.filterService.getJobSeekerCount().subscribe({
      next: data => this.jobSeekerCount = data
    })
  }

  receiveSearchData() {
    console.log(this.searchBarForm.value);
    this.router.navigate(
      ['search'],
      { queryParams: this.searchBarForm.value }
    )
  }

}
