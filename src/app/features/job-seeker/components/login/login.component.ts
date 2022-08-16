import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/data/enums/role.enum';

@Component({
  selector: 'app-login',
  template: `
    <app-login-template [role]="role.jobSeeker">
    </app-login-template>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  role = Role;

  constructor() { }

  ngOnInit(): void {
  }

}
