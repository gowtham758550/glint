import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeaturesModule } from '../features/features.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    CoreRoutingModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
