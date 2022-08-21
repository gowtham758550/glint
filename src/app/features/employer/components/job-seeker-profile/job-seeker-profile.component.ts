import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from 'src/app/data/services/filter.service';
import { Appliers } from 'src/app/data/models/appliers.model';
import { BlobService } from 'src/app/data/services/blob.service';
import { EducationService } from 'src/app/data/services/education.service';
import { ExperienceService } from 'src/app/data/services/experience.service';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { environment } from 'src/environments/environment';
import { SkillsService } from 'src/app/data/services/skills.service';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/data/enums/status.enum';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';

@Component({
  selector: 'app-job-seeker-profile',
  templateUrl: './job-seeker-profile.component.html',
  styleUrls: ['job-seeker.component.css']
})
export class JobSeekerProfileComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['jobSeekerId'];
  imageUrl!: string;
  isProfilePictureLoaded = false;
  jobSeekerProfile!: any;
  educationArray: any;
  experienceArray: any;
  postJobDetailId = this.route.snapshot.params['jobId'];;
  appliers!: any;
  currentApplier!: any;
  skillArray !: any;
  sas_token = environment.profile_sas_token;
  status = Status;

  constructor(private route: ActivatedRoute,
    private jobSeekerService: JobSeekerService,
    private blobService: BlobService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private filterService: FilterService,
    private skillService: SkillsService,
    private appliedJobService: AppliedJobService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.getJobSeekerbyId();
    this.getProfilePicture();
    this.getEducationDetail();
    this.getJobAppliers();
    this.getExperienceDetail();
  }
  getJobAppliers() {
    console.log(this.postJobDetailId)
    this.filterService.getJobAppliers(this.postJobDetailId).subscribe({
      next: data => {
        this.appliers = data;
        console.log(this.appliers)
        for (var i = 0; i < this.appliers.length; i++) {
          if (this.appliers[i].jobSeekerId == this.id) {
            this.currentApplier = this.appliers[i];
            console.log(this.currentApplier)
            this.getSkillDetail(this.currentApplier);
            // this.getResumebyId(this.currentApplier.id)
            break;
          }
        }
      }
    });
  }

  getSkillDetail(currentApplier: any){
    this.skillService.getSkillsByUserId(currentApplier.jobSeekerId).subscribe(res=>this.skillArray=res)
  }
  getResumebyId(id:number){
    console.log(id)
    this.blobService.getResumebyId(id).subscribe((res:any)=>{
      console.log(res);
      console.log(res.url);
      var link = document.createElement('a');
      link.href = res.url + "?" + environment.resume_sas_token;
      link.click();
      // window.open(link.href, '_blank');
      window.URL.revokeObjectURL(link.href);

    })
  }
  getJobSeekerbyId() {
    console.log(this.id);
    this.jobSeekerService.getUserById(this.id).subscribe(res => this.jobSeekerProfile = res)
  }
  getProfilePicture() {
    this.blobService.getProfilePicture().subscribe({
      next: (data: any) => {
        if (data.url) {
          let res = data.url;
          this.imageUrl = res + "?" + environment.profile_sas_token;
        }
        this.isProfilePictureLoaded = true;
      },
    })
  }
  getEducationDetail() {
    this.educationService.getEducationByUserId(this.id).subscribe(res => this.educationArray = res);
  }
  getExperienceDetail() {
    this.experienceService.getExperienceByUserId(this.id).subscribe((res: any) => {
      this.experienceArray = res;
      this.spinner.hide();
    });
  }

  shortlistCandidate() {
    this.appliedJobService.updateAppliedJobStatus(this.currentApplier.appliedJobId, this.postJobDetailId, Status.Shortlisted).subscribe({
      next: () => {
        this.toastr.success(`Candidate ${this.currentApplier.userName} shortlisted`);
        this.router.navigateByUrl(`/employer/job/${this.postJobDetailId}`);
      }
    });
  }

  rejectCandidate() {
    this.appliedJobService.updateAppliedJobStatus(this.currentApplier.appliedJobId, this.postJobDetailId, Status.Rejected).subscribe({
      next: () => {
        this.toastr.info(`Candidate ${this.currentApplier.userName} rejected`);
        this.router.navigateByUrl(`/employer/job/${this.postJobDetailId}`);
      }
    })
  }


}
