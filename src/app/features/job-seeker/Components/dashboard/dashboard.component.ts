import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { JobsList } from '../../Data/jobList';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  InitialJobArray: any = this.jobs.getJobs();
  Jobs: any = this.InitialJobArray;
  //Implementation to return the jobs based on searchbox keywords
  SearchJobEmitter: any;
  getSearchJob(event: any) {
    this.SearchJobEmitter = event;
    if (event === '') {
      this.Jobs = this.InitialJobArray;
    }
    else {
      this.Jobs = this.Jobs.filter(
        (x: any) =>
          x.Job_title.toLowerCase().includes(event.toLowerCase()) || x.Company_Name.toLowerCase().includes(event.toLowerCase()) || x.Location.toLowerCase().includes(event.toLowerCase()) || x.Job_Type.toLowerCase().includes(event.toLowerCase()));
    }
  }

  //Implementation of Job Filter based on Experience

  isJobFilterExperience = false;
  getSelectedExperience: any = []; //Get Selected Experience array from job-filter sidenav child component

  // Method to return the jobs based on experience
  ExperienceAdded(experienceList: any) {
    this.isJobFilterExperience = true;

    if (experienceList.length > 0 && experienceList.length != 2) {
      this.Jobs = this.InitialJobArray.filter((x: any) => this.ReturnJobCardsExperienceBased(experienceList, x));
    }
    else if (experienceList.length == 2) {
      this.Jobs = this.InitialJobArray;
    }
    else {
      this.Jobs = this.InitialJobArray;
    }
  }

  ReturnJobCardsExperienceBased(arrayList: any[], value: any) {
    for (let i = 0; i < arrayList.length; i++) {
      console.log(arrayList[i].name)
      if (value.Experience == arrayList[i].name) {
        return value
      }
    }
  }

  //Implementation of Job Filter based on Designation
  isJobFilterDesignation = false;
  getSelectedDesignation: any = [];
  DesignationFilterArray: any = [];

  DesignationAdded(DesignationList: any) {
    this.isJobFilterExperience = true;
    // console.log(DesignationList);
    if (DesignationList.length > 0) {
      this.Jobs = this.InitialJobArray.filter((x: any) => this.ReturnJobCardsDesignationBased(DesignationList, x));
    }
    else if (DesignationList.length == 6) {
      this.Jobs = this.InitialJobArray;
    }
    else {
      this.Jobs = this.InitialJobArray;
    }
  }
  ReturnJobCardsDesignationBased(arrayList1: any[], value: any) {
    console.log(value)
    for (var k = 0; k < arrayList1.length; k++) {
      // console.log(k)
      if (arrayList1[k].title == value.Job_title) {
        // console.log(value);
        return value;
      }
    }
  }
  //Implementation of Job Filter based on Location
  isJobFilterLocation = false;
  getSelectedLocation: any = [];
  LocationFilterArray: any = [];

  LocationAdded(LocationList: any) {
    this.isJobFilterLocation = true;
    if (LocationList.length > 0) {
      this.Jobs = this.InitialJobArray.filter((x: any) => this.ReturnJobCardsLocationBased(LocationList, x));
    }
    else if (LocationList.length == 4) {
      this.Jobs = this.InitialJobArray;
    }
    else {
      this.Jobs = this.InitialJobArray;
    }
  }
  ReturnJobCardsLocationBased(arrayList1: any[], value: any) {
    console.log(value)
    for (var k = 0; k < arrayList1.length; k++) {
      // console.log(k)
      if (arrayList1[k].location == value.Location) {
        // console.log(value);
        return value;
      }
    }
  }



  constructor(private messageService: MessageService, private jobs: JobsList) {
  }

  ngOnInit(): void {
    this.Jobs = this.InitialJobArray;
    console.log(this.Jobs);
  }

}
