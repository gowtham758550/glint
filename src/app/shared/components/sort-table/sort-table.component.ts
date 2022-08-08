import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/data/models/job.model';

@Component({
  selector: 'app-sort-table',
  templateUrl: './sort-table.component.html',
  styles: [
  ]
})
export class SortTableComponent implements OnInit {
  
  @Input()
  title!: string;
  @Input()
  jobs!: Job[];

  constructor() { }

  ngOnInit(): void {
  }

}
