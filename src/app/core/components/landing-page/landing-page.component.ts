import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchBar } from 'src/app/data/models/search-bar.model';
import { Option } from 'src/app/data/models/options.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  isLoggedIn!: boolean;
  totalJobCount!: number;
  totalCompanyCount!: number;
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
  ) { }

  ngOnInit(): void {
    // this.isLoggedIn = this.authGuard.canActivate();
    this.totalJobCount = 43;
    this.totalCompanyCount = 12;
  }

  receiveSearchData() {
    console.log(this.searchBarForm.value);
    this.router.navigate(
      ['search'],
      { queryParams: this.searchBarForm.value }
    )
  }

}
