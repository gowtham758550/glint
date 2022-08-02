import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar-dashboard',
  templateUrl: 'searchbar-dashboard.component.html',
  styleUrls: ['searchbar-dashboard.component.css']
})
export class SearchbarDashboardComponent implements OnInit {
  SearchDesignation: string = '';
  @Output() DesignationEmitter: any = new EventEmitter<any>();
  SearchLocation: string = '';
  @Output() LocationEmitter: any = new EventEmitter<any>();
  getSearchDesignation() {
    console.log(this.SearchDesignation);
    this.DesignationEmitter.emit(this.SearchDesignation);
  }
  getSearchLocation(){
    this.LocationEmitter.emit(this.SearchLocation);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
