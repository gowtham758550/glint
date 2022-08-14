import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlobService } from 'src/app/data/services/blob.service';
import { EducationService } from 'src/app/data/services/education.service';
import { ExperienceService } from 'src/app/data/services/experience.service';
import { JobSeekerService } from 'src/app/data/services/job-seeker.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-seeker-profile',
  templateUrl: './job-seeker-profile.component.html',
  styleUrls: ['job-seeker.component.css']
})
export class JobSeekerProfileComponent implements OnInit {

  id:any;
  imageUrl!:string;
  isImageLoaded!:boolean;
  educationArray:number[]=[1];
  experienceArray:number[]=[1];
  constructor(private route: ActivatedRoute,
    private jobSeekerService: JobSeekerService,
    private blobService: BlobService,
    private educationService: EducationService,
    private experienceService: ExperienceService) { }

  ngOnInit() {
    this.getJobSeekerbyId();
    this.getProfilePicture();
    this.getEducationDetail();
  }
  getJobSeekerbyId(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.jobSeekerService.getUserById(this.id).subscribe(res=> console.log(res))
  }
  getProfilePicture(){
    this.blobService.getProfilePicture().subscribe({
      next: (data: any) => {
        let res = data.url;
        this.imageUrl = res + "?" + environment.profile_sas_token;
        this.isImageLoaded = true;
      },
    })
  }
  getEducationDetail(){
    this.educationService.getEducationByUserId(this.id).subscribe(res=>console.log(res));
  }
  getExperienceDetail(){
    this.experienceService.getEducationByUserId(this.id).subscribe(res=>console.log(res));
  }


}
