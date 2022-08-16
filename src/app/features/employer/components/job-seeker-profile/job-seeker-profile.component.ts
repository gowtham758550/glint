import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/data/services/filter.service';
import { Appliers } from 'src/app/data/models/appliers.model';
import { BlobService } from 'src/app/data/services/blob.service';
import { EducationService } from 'src/app/data/services/education.service';
import { ExperienceService } from 'src/app/data/services/experience.service';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { environment } from 'src/environments/environment';
import { SkillsService } from 'src/app/data/services/skills.service';
import { AppliedJobService } from 'src/app/data/services/applied-job.service';

@Component({
  selector: 'app-job-seeker-profile',
  templateUrl: './job-seeker-profile.component.html',
  styleUrls: ['job-seeker.component.css']
})
export class JobSeekerProfileComponent implements OnInit {
  id: any;
  imageUrl!: string;
  isImageLoaded!: boolean;
  jobSeekerProfile!: any;
  educationArray: any;
  experienceArray: any;
  postJobDetailId = this.route.snapshot.params['jobId'];;
  appliers!: Appliers[];
  currentApplier!: Appliers;
  skillArray !: any;
  sas_token = environment.profile_sas_token;

  constructor(private route: ActivatedRoute,
    private jobSeekerService: JobSeekerService,
    private blobService: BlobService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private filterService: FilterService,
    private skillService: SkillsService,
    private appliedJobService: AppliedJobService
    ) { }

  ngOnInit() {
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
          console.log(this.id)
          console.log(this.appliers[i].jobSeekerId)
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

  getSkillDetail(currentApplier: Appliers){
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
    this.id = this.route.snapshot.paramMap.get('jobSeekerId');
    console.log(this.id);
    this.jobSeekerService.getUserById(this.id).subscribe(res => this.jobSeekerProfile = res)
  }
  getProfilePicture() {
    this.blobService.getProfilePicture().subscribe({
      next: (data: any) => {
        let res = data.url;
        this.imageUrl = res + "?" + environment.profile_sas_token;
        this.isImageLoaded = true;
      },
    })
  }
  getEducationDetail() {
    this.educationService.getEducationByUserId(this.id).subscribe(res => this.educationArray = res);
  }
  getExperienceDetail() {
    this.experienceService.getExperienceByUserId(this.id).subscribe((res: any) => this.experienceArray = res);
  }

  shortlistCandidate() {
    this.appliedJobService.updateAppliedJobStatus(this.postJobDetailId).subscribe({
      next: data => console.log(data)
    });
  }


}
