import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { Appliers } from 'src/app/data/models/appliers.model';
import { Job } from 'src/app/data/models/job.model';
import { FilterService } from 'src/app/data/services/filter.service';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { JobService } from 'src/app/data/services/job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-job-employer',
  templateUrl: './view-job.component.html',
  })
export class ViewJobComponent implements OnInit {

  isJobInfoLoaded = false;
  isAppliersTableLoaded = false;
  postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId'];;
  sas_token = environment.profile_sas_token;
  appliers!: Appliers[];
  job!: Job;
  totalApplicants!:number;

  constructor(
    private filterService: FilterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private toastr: ToastrService,
    private jobSeekerService : JobSeekerService
  ) { }

  ngOnInit(): void {
    this.getJob();
    this.getjobSeekerCountByJobId();
    this.getJobAppliers();
  }

  getJobAppliers() {
    this.filterService.getJobAppliers(this.postJobDetailId).subscribe({
      next: data => {
        this.appliers = data;
        console.log(data);
        this.isAppliersTableLoaded = true;
      }
    });
  }

  getJobSeekerProfileById(jobSeekerId:number, appliedJobId: number){
    this.router.navigate(['employer/job-seeker/profile/',jobSeekerId, appliedJobId])
  }

  
  getJob() {
    this.jobService.getJobById(this.postJobDetailId).subscribe({
      next: data => {
        this.job = data;
        console.log(data)
        this.isJobInfoLoaded = true;
      }
    });
  }

  routeToEdit() {
    this.router.navigateByUrl(`/employer/job/edit/${this.postJobDetailId}`);
  }

  deleteJob() {
    this.jobService.deleteJob(this.postJobDetailId).subscribe({
      next: () => {
        this.router.navigateByUrl('/employer/jobs');
        this.toastr.success(`${this.job.jobTitle} deleted successfully`);
      }
    });
  }

  getjobSeekerCountByJobId(){
    this.filterService.getJobSeekerCountByJobId(this.postJobDetailId).subscribe(res=>this.totalApplicants=res)
  }
}
