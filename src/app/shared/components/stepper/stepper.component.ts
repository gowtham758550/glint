import { Component, Input, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styles: [
  ]
})
export class StepperComponent implements OnInit {

  @Input()
  items!: MenuItem[];

  constructor() { }

  ngOnInit() {
  }

}
