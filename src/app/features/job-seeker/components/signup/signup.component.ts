import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup-job-seeker',
  template: `
    <app-signup [role]="'JobSeeker'"></app-signup>
  `,
  styles: [
  ]
})
export class SignupComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void { }
}
