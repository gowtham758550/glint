import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Job } from 'src/app/data/models/job.model';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styles: [
  ]
})
export class JobCardComponent implements OnInit {

  @Input() job!: Job;

  profile_sas_token = environment.profile_sas_token;
  isApplied: boolean = false;


  constructor(
    private appliedJobService: AppliedJobService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    
  }

  applyForJob() {
    if (this.job.postJobDetailId) {
      this.appliedJobService.applyJob(this.job.postJobDetailId).subscribe({
        next: () => {
          this.toastr.success('Applied');
          this.isApplied = true;
        }
      });
    }
  }
}
