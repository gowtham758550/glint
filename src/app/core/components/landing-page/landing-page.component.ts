import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/data/models/form-field.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  totalJobCount!: number;
  totalCompanyCount!: number;

  field: FormField[] = [
    {
      type: 'select',
      label: 'Username',
      formControlName: 'username',
      class: ['w-100'],
      options: [
        {value: 'a', option: 'a'},
        {value: 'a', option: 'a'},
        {value: 'a', option: 'a'},
      ]
    },
    {
      type: 'input',
      label: 'label',
      formControlName: 'label',
      class: ['w-100']
    }
  ]
  group: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.totalJobCount = 43;
    this.totalCompanyCount = 12;
  }

}
