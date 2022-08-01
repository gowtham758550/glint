import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchBar } from 'src/app/data/models/search-bar.model';
import { Option } from 'src/app/data/models/options.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.totalJobCount = 43;
    this.totalCompanyCount = 12;
  }

  receiveSearchData() {
    console.log(this.searchBarForm.value);
  }

}
