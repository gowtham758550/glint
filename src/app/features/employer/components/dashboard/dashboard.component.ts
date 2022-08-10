import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  totalJobs!: number;
  totalHiring!: number;

  constructor() { }

  ngOnInit(): void {
    this.totalJobs = 9;
    this.totalHiring = 41;
  }

}
