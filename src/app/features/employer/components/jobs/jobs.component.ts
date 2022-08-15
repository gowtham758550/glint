import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { Job } from 'src/app/data/models/job.model';
import { JobService } from 'src/app/data/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls:['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  routeConstants = RouteConstants;
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
    console.log(this.postJobDetailId)
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
