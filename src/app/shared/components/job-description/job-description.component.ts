import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsList } from 'src/app/features/job-seeker/Data/jobList';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-job-description',
  templateUrl: 'job-description.component.html',
  styleUrls: ['job-description.component.css'],
  providers: [MessageService]

})
export class JobDescriptionComponent implements OnInit {
  Id!:number;
  queryparam:any;
  individualJob:any;
  AppliedJob:any=[];

  constructor(private route: ActivatedRoute, private jobList:JobsList, private messageService:MessageService) { }

  ngOnInit(): void {
    this.queryparam = this.route.snapshot.paramMap;
    this.Id=this.queryparam.get('id');
    this.individualJob= this.jobList.getJobs();
    this.individualJob=this.individualJob.filter((x:any)=>x.id==this.Id);
    console.log(this.individualJob);
  }
  showMessage(appliedJob: any) {
    this.AppliedJob.push(appliedJob);
    console.log(this.AppliedJob);
    this.messageService.add({ severity: 'info', detail: 'Applied Successfully', key: 'tl' });
    console.log(this.messageService);
  }

}
