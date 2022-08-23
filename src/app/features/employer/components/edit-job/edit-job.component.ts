import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FormField } from 'src/app/data/models/form-field.model';
import { JobService } from 'src/app/data/services/job.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styles: [
  ]
})
export class EditJobComponent implements OnInit {

  jobForm: FormGroup = this.formBuilder.group({
    jobTitle: ['', Validators.required],
    description: ['', Validators.required],
    experienceNeeded: ['', Validators.required],
    salary: ['', Validators.required],
    jobType: ['', Validators.required],
    minimumQualification: ['', Validators.required],
    location: ['', Validators.required],
    createdDate: [new Date(), Validators.required]
  })
  jobFields: FormField[] = [
    {
      type: 'title',
      label: `Update job`,
      class: ['fw-bold']
    },
    {
      type: 'input-with-suggestion',
      label: 'Job title',
      class: [],
      formControlName: 'jobTitle',
      datalist: this.jobService.jobs
    },
    {
      type: 'textarea',
      label: 'Description',
      formControlName: 'description',
      class: []
    },
    {
      type: 'number',
      label: 'Experience (in years)',
      formControlName: 'experienceNeeded',
      class: ['']
    },
    {
      type: 'number',
      label: 'Salary',
      formControlName: 'salary',
      class: ['']
    },
    {
      type: 'select',
      label: 'Job type',
      formControlName: 'jobType',
      class: [],
      options: this.jobService.jobTypeOptions
    },
    {
      type: 'select',
      label: 'Minimum qualification',
      formControlName: 'minimumQualification',
      class: [],
      options: this.jobService.jobQualification
    },
    {
      type: 'select',
      label: 'Location',
      formControlName: 'location',
      class: [],
      options: this.jobService.jobLocation
    },
    {
      type: 'submit',
      label: 'Update job',
      class: []
    }
  ]
  postJobDetailId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getJobById();
  }

  getJobById() {
    const postJobDetaiId = this.activatedRoute.snapshot.params['postJobDetaiId'];
    this.postJobDetailId = postJobDetaiId;
    this.jobService.getJobById(postJobDetaiId).subscribe({
      next: data => this.jobForm.patchValue(data)
    })
  }

  updateJob() {
    const updatedJob = {
      ...this.jobForm.value,
      ...{
        postJobDetailId: this.postJobDetailId
      }
    }
    this.jobService.updateJob(updatedJob).subscribe({
      next: data => {
        this.toastr.success('Job updated successfully');
        this.router.navigateByUrl(`/employer/jobs`);
      }
    });
  }

}
