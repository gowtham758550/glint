import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FormField } from 'src/app/data/models/form-field.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  @Input()
  formGroup!: FormGroup;
  get f() {
    console.log(this.formGroup.controls)
    return this.formGroup.controls;
  }
  @Input()
  formFields!: FormField[];
  @Output()
  formEmitter = new EventEmitter();
  

  constructor() { }

  ngOnInit(): void {
  }

  emitFormData() {
    this.formEmitter.emit();
  }

}
