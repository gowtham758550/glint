import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-job-filter-sidenav',
  templateUrl: 'job-filter-sidenav.component.html',
  styleUrls: ['job-filter-sidenav.component.css']
})
export class JobFilterSidenavComponent implements OnInit {

  selectedCategories: any[] = [];
  selectedDesignation: any[] = [];
  selectedLocation: any[] = [];
  CategoryExperienceBased: any[] = [{ name: 'Experienced', key: 'E' }, { name: 'Fresher', key: 'F' }];
  Designation: any[] = [
    { title: 'Full Stack Developer', key: 'FSD' },
    { title: 'Backend Developer', key: 'BD' },
    { title: 'Frontend Developer', key: 'FD' },
    { title: 'Quality Analyst', key: 'QA' },
    { title: 'Android Developer', key: 'AD' },
    { title: 'IOS Developer', key: 'IOS', }
  ];
  Location: any[] = [{ location: 'Chennai', key: 'C' }, { location: 'Bangalore', key: 'B' }, { location: 'Hyderabad', key: 'H' }, { location: 'Coimbatore', key: 'Co' }];

  @Output() getSelectedExperience = new EventEmitter<any>();
  getFilteredExperience() {
    this.getSelectedExperience.emit(this.selectedCategories);
  }
  @Output() getSelectedDesignation = new EventEmitter<any>();
  getFilteredDesignation(){
    this.getSelectedDesignation.emit(this.selectedDesignation);
  }
  constructor() { }

  ngOnInit(): void {
    this.selectedDesignation = this.Designation.slice(6, 7);
    this.selectedCategories = this.CategoryExperienceBased.slice(2, 3);
    this.selectedLocation = this.Location.slice(4, 4);
  }

}
