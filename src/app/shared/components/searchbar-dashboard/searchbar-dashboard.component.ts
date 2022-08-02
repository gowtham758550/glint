import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar-dashboard',
  templateUrl: 'searchbar-dashboard.component.html',
  styleUrls: ['searchbar-dashboard.component.css']
})
export class SearchbarDashboardComponent implements OnInit {
  SearchJob: string = '';
  @Output() SearchJobEmitter: any = new EventEmitter<any>();
  getSearchJob() {
    this.SearchJobEmitter.emit(this.SearchJob);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
