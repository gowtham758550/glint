import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown'

import { SearchBarComponent } from './components/search-bar/search-bar.component';



@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    BrowserAnimationsModule
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SharedModule { }
