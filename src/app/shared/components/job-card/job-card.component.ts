import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/data/models/job.model';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styles: [
  ]
})
export class JobCardComponent implements OnInit {

  @Input() job!: Job;
  isApplied: boolean = false;
  
  constructor(
    private appliedJobService: AppliedJobService,
    private toastr: ToastrService
  ) { 
  }

  ngOnInit(): void {
    this.appliedJobService.isApplied(this.job.postJobDetailId).subscribe({
      next: (data: any) => this.isApplied = data.status
    });
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
}
