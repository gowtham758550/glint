import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/data/models/job.model';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';
import { FilterService } from 'src/app/data/services/filter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styles: [
  ]
})
export class JobCardComponent implements OnInit {

  @Input() job!: Job;

  @Input() minimalJobs!: any[];
  currentJob!: any;
  variableChange!:any;
  profile_sas_token = environment.profile_sas_token;

  isApplied: boolean = false;

  jobListMinimal: any

  constructor(
    private appliedJobService: AppliedJobService,
    private toastr: ToastrService,
    private filterService: FilterService
  ) {

    
  }

  ngOnInit(): void {
    
  }

  applyForJob() {
    if (this.job.postJobDetailId) {
      this.appliedJobService.applyJob(this.job.postJobDetailId).subscribe({
        next: data => {
          this.toastr.success('Applied');
          this.isApplied = true;
        }
      });
    }
  }

  getIsApplied() {
    this.appliedJobService.isApplied(this.job.postJobDetailId).subscribe({
      next: (data: any) => this.isApplied = data.status
    });
  }
}
