import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Jobs: any = [{
    image: '/assets/Conzio.jpg',
    Company_Name: 'Conzio Constructions',
    Job_title: 'Software Engineer',
    Location: 'Coimbatore',
    CTC: 25000,
    Job_Type: 'Full Time',

  }, {
    image: '/assets/Midway Overline.jpg',
    Company_Name: 'Midway Overline',
    Job_title: 'Software Engineer',
    Location: 'Coimbatore',
    CTC: 50000,
    Job_Type: 'Full Time'
  },
  {
    image: '/assets/Midway Overline.jpg',
    Company_Name: 'Midway Overline',
    Job_title: 'Software Engineer',
    Location: 'Coimbatore',
    CTC: 50000,
    Job_Type: 'Full Time'
  },
  {
    image: '/assets/Midway Overline.jpg',
    Company_Name: 'Midway Overline',
    Job_title: 'Software Engineer',
    Location: 'Coimbatore',
    CTC: 50000,
    Job_Type: 'Full Time'
  },
  {
    image: '/assets/Midway Overline.jpg',
    Company_Name: 'Midway Overline',
    Job_title: 'Software Engineer',
    Location: 'Coimbatore',
    CTC: 50000,
    Job_Type: 'Full Time'
  }];
  
  


  constructor() { }

  ngOnInit(): void {
  }

}
