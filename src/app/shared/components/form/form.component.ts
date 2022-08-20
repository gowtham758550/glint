import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { pendingChangesGuard } from 'src/app/core/guards/pendingChanges.guard';  
import { FormField } from 'src/app/data/models/form-field.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {
  // @HostListener("window:beforeunload")  
  // canDeactivate(): Observable<boolean> | boolean {  
  //     return (  
  //         !this.formGroup.dirty  
  //     );  
  // } 
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
  
  value:[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  emitFormData() {
    this.formEmitter.emit();
  }

}
