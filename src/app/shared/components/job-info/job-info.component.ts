import { Component, Input, OnInit } from '@angular/core';
import { JobDetail } from 'src/app/data/models/job-detail.model';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styles: [
  ]
})
export class JobInfoComponent implements OnInit {
  @Input() jobs!:JobDetail;
  constructor() { 
    console.log(this.jobs)
  }

  ngOnInit(): void {
  }

}
