import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { FeaturesModule } from '../features/features.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/User-register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/user-login/user-login.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    RegisterComponent,
    UserLoginComponent
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
