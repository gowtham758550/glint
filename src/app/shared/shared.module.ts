import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown'
import { CheckboxModule } from 'primeng/checkbox';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { JobFilterSidenavComponent } from './components/job-filter-sidenav/job-filter-sidenav.component';
import { SearchbarDashboardComponent } from './components/searchbar-dashboard/searchbar-dashboard.component';



@NgModule({
  declarations: [
    SearchBarComponent,
    FormComponent,
    SidenavComponent,
    JobFilterSidenavComponent,
    SearchbarDashboardComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
  ],
  exports: [
    SearchBarComponent,
    FormComponent,
    SidenavComponent,
    JobFilterSidenavComponent,
    SearchbarDashboardComponent
  ]
})
export class SharedModule { }
