import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styles: [
  ]
})
export class MyJobsComponent implements OnInit {

  events1: any;
  
  events2: any;

  constructor(
    private appliedJobService: AppliedJobService
  ) { }
  
  ngOnInit() {
    this.getMyJobs();
    this.events1 = [
        {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.BOOK, color: '#9C27B0', info: 'Applied on ' },
        {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7', info: 'Rejected on '},
    ];

    this.events2 = [
        "2020", "2021", "2022", "2023"
    ];
  }

  getMyJobs() {
    this.appliedJobService.getAppliedJobs().subscribe({
      next: data => console.log(data)
    })
  }

}
