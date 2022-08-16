import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { UserVerificationComponent } from "./components/user-verification/user-verification.component";

const routes: Routes = [
    { 
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'user-verification',
        component: UserVerificationComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }