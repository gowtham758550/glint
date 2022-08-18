import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormField } from 'src/app/data/models/form-field.model';
import { DataService } from 'src/app/data/services/data.service';
import { JobService } from 'src/app/data/services/job.service';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styles: [
  ]
})
export class NewJobComponent implements OnInit {

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
      label: 'Create new job',
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
      label: 'Create job',
      class: []
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private toastr: ToastrService,
    private router: Router,
    private dataService: DataService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    // this.getCategories()
    // this.getQualifications();
  }

  getCategories() {
    this.dataService.getCategories().subscribe({
      next: categries => console.log(categries)
    });
  }

  getQualifications() {
    this.dataService.getQualifications().subscribe({
      next: qualifications => console.log(qualifications)
    })
  }

  createJob() {
    this.spinner.show();
    console.log(this.jobForm.value);
    this.jobService.postJob(this.jobForm.value).subscribe({
      next: data => {
        this.toastr.success('Job created successfully', 'Success');
        this.router.navigateByUrl('/employer/jobs');
        this.spinner.hide();
      }
    });
  }
  
}
