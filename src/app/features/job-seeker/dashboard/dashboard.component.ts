import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  InitialJobArray: any = [{
    image: '/assets/Conzio.jpg',
    Company_Name: 'Conzio Constructions',
    Job_title: 'Software Engineer',
    Location: 'Coimbatore',
    CTC: 25000,
    Job_Type: 'Full Time',
    Experience: 'Fresher'

  }, {
    image: '/assets/Midway Overline.jpg',
    Company_Name: 'Midway Overline',
    Job_title: 'Software Engineer',
    Location: 'Coimbatore',
    CTC: 50000,
    Job_Type: 'Full Time',
    Experience: 'Experienced'
  },
  {
    image: '/assets/Midway Overline.jpg',
    Company_Name: 'Midway Overline',
    Job_title: 'IOS Developer',
    Location: 'Coimbatore',
    CTC: 50000,
    Job_Type: 'Full Time',
    Experience: 'Fresher'
  },
  {
    image: '/assets/Midway Overline.jpg',
    Company_Name: 'Midway Overline',
    Job_title: 'Android Developer',
    Location: 'Coimbatore',
    CTC: 50000,
    Job_Type: 'Full Time',
    Experience: 'Experienced'
  },
  {
    image: '/assets/Midway Overline.jpg',
    Company_Name: 'Midway Overline',
    Job_title: 'Full Stack Developer',
    Location: 'Coimbatore',
    CTC: 50000,
    Job_Type: 'Full Time',
    Experience: 'Experienced'
  }];
  Jobs: any = this.InitialJobArray;
  DesignationEmitter:any;
  getSearchDesignation(event:any){
    this.Jobs=this.Jobs.filter((x:any)=> x.Job_title==event);
    console.log(event);
  }
  LocationEmitter:any='';
  //Implementation of Job Filter based on Experience
  isJobFilterExperience = false;
  getSelectedExperience: any = []; //Get Selected Experience array from job-filter sidenav child component
  // Method to return the jobs based on experience
  ExperienceAdded(experienceList: any) {
    this.isJobFilterExperience = true;

    if (experienceList.length > 0 && experienceList.length != 2) {
      this.Jobs = this.Jobs.filter((x: any) => this.ReturnJobCardsExperienceBased(experienceList, x));
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
  DesignationFilterArray:any=[];
  DesignationAdded(DesignationList: any) {
    this.isJobFilterExperience = true;
    // console.log(DesignationList);
    if (DesignationList.length > 0 ) {
      console.log("***********");
      this.Jobs = this.Jobs.filter((x: any) => this.ReturnJobCardsDesignationBased(DesignationList, x));
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
    console.log("###########");
    for( var k=0;k<arrayList1.length;k++){
      // console.log(k)
      if(arrayList1[k].title==value.Job_title){
        // console.log(value);
        return value;
      }
    }
  }
  constructor() {

   }

  ngOnInit(): void {
  }

}
