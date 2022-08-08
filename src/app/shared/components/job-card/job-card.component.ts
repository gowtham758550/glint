import { Component, Input, OnInit } from '@angular/core';
import { JobDetail } from 'src/app/data/models/job-detail.model';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styles: [
  ]
})
export class JobCardComponent implements OnInit {
  @Input() jobs!: JobDetail;
  constructor() { 
    console.log(this.jobs);
  }

  ngOnInit(): void {
  }

}
