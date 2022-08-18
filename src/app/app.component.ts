import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

interface Route {
  value: string,
  routeTo: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  constructor() {}

}
