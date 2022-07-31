import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  totalJobCount!: number;
  totalCompanyCount!: number;

  constructor() { }

  ngOnInit(): void {
    this.totalJobCount = 43;
    this.totalCompanyCount = 12;
  }

}
