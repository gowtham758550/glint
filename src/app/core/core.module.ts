import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeaturesModule } from '../features/features.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { UserVerificationComponent } from './components/user-verification/user-verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent,
    UserVerificationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    CoreRoutingModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    Interceptor
  ]
})
export class CoreModule { }
