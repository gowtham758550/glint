import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Job } from 'src/app/data/models/job.model';
import { JobService } from 'src/app/data/services/job.service';

@Component({
  selector: 'app-job-cards',
  templateUrl: 'job-cards.component.html'
})
export class JobCardsComponent implements OnInit {

  jobs: Job[] = [];
  isLoaded = false;
  postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId'];
  

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  routeToEdit(id:number) {
    this.router.navigateByUrl(`/employer/job/edit/${id}`);
  }

  deleteJob(id:number, jobTitle:string) {
    this.jobService.deleteJob(id).subscribe({
      next: () => {
        // this.router.navigateByUrl('/employer/jobs');
        this.getJobs();
        this.toastr.success(`${jobTitle} deleted successfully`);
      }
    });
  }

  
  getJobs() {
    this.jobService.getPostedJob().subscribe({
      next: data => {
        this.jobs = data;
        this.isLoaded = true;
      }
    });
  }

}
