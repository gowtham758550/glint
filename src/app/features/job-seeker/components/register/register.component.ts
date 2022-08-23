import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
      label: 'Signup',
      routerLink: ''
    },
    {
      label: 'Verify Account',
      routerLink: 'verify-account'
    },
    {
      label: 'Personal Information',
      routerLink: 'personal-information'
    },
  ]
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  

  receiveFormData() {
  }
}
