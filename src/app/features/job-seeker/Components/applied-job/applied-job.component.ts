import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-applied-job',
  templateUrl: 'applied-job.component.html',
  styleUrls: ['applied-job.component.css']
})
export class AppliedJobComponent implements OnInit {
  @Input() appliedJob:any=[];
  constructor() { 
    console.log(this.appliedJob)
  }

  ngOnInit(): void {
  }

}
