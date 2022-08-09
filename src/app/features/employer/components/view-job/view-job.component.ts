import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/data/services/filter.service';

@Component({
  selector: 'app-view-job-employer',
  templateUrl: './view-job.component.html',
  styles: [
  ]
})
export class ViewJobComponent implements OnInit {

  appliers: any;

  constructor(
    private filterService: FilterService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getJobAppliers();
  }

  getJobAppliers() {
    const postJobDetailId = this.activatedRoute.snapshot.params['postJobDetailId']
    this.filterService.getJobAppliers(postJobDetailId).subscribe({
      next: data => this.appliers = data
    });
  }
}
