import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <h1 [ngClass]="class">
      Gl<span class="text-warning">i</span>nt
      <span>
        <i class="pi pi-briefcase fs-3"
          [ngClass]="class">
        </i>
      </span>
    </h1>
  `,
  styles: [
  ]
})
export class LogoComponent implements OnInit {

  @Input()
  class!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
