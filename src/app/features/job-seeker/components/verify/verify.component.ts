import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-job-seeker',
  template: `
    <app-verify></app-verify>
  `,
  styles: [],
  providers: []
})
export class VerifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
