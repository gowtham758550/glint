import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';

import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { Job } from 'src/app/data/models/job.model';
import { JobService } from 'src/app/data/services/job.service';
import { PdfColumn } from 'src/app/data/models/pdf-column.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  routeConstants = RouteConstants;
  jobs: Job[] = [];
  isLoaded = false;
  postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId'];
  pdfColumn: PdfColumn[] = [
    { field: 'postJobDetailId', header: 'Job id' },
    { field: 'employerID', header: 'Employer id' },
    { field: 'jobTitle', header: 'Job title' },
    { field: 'description', header: 'Job description' },
    { field: 'experienceNeeded', header: 'Experience needed' },
    { field: 'salary', header: 'Salary' },
    { field: 'jobType', header: 'Job type' },
    { field: 'minimumQualification', header: 'Minimum qualification' },
    { field: 'location', header: 'Location' },
    { field: 'createdDate', header: 'Created date' },
  ]

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  routeToEdit(id: number) {
    this.router.navigateByUrl(`/employer/job/edit/${id}`);
  }

  deleteJob(id: number, jobTitle: string) {
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

  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default('p', 'in');
        (doc as any).autoTable(this.pdfColumn, this.jobs);
        const timestamp = new Date();
        doc.save(`All Jobs ${timestamp.toLocaleString()}.pdf`);
      })
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.jobs);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
