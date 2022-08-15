import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-employer',
  template: `
    <app-verify [role]="'Employer'"></app-verify>
  `,
  styles: [
  ]
})
export class VerifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
