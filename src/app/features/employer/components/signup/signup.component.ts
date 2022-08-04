import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-employer',
  template: `
    <app-signup [role]="'Employer'"></app-signup>
  `,
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
