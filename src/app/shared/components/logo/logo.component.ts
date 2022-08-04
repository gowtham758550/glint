import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <h1>Gl<span class="text-primary">i</span>nt</h1>
  `,
  styles: [
  ]
})
export class LogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
