import { Component, Input, OnInit } from '@angular/core';
import { Option } from 'src/app/data/models/options.model';
import { SearchBar } from 'src/app/data/models/search-bar.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {

  // @Input()
  // searchBarData!: SearchBar[];

  searchBarData: SearchBar[] = [
    {
      label: 'Enter designation',
      type: 'input'
    },
    {
      label: 'Select experience',
      type: 'select'
    },
    {
      label: 'Enter location',
      type: 'input'
    }
  ];
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
  isFirstOption: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  selectOnChange(event: any) {
    if (event.target.value == 0) this.isFirstOption = true;
    else this.isFirstOption = false;
  }

}
