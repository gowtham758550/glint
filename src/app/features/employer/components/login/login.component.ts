import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/data/enums/role.enum';

@Component({
  selector: 'app-employer-login',
  template: `
    <app-login-template [role]="role.employer">
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
