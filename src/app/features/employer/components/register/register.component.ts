import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Register',
      routerLink: ''
    },
    {
      label: 'Verify Account',
      routerLink: 'verify-account'
    },
    {
      label: 'Company Details',
      routerLink: 'company-detail'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
