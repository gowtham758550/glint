import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Title } from "../data/enums/constatnts/title.constants";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { UserVerificationComponent } from "./components/user-verification/user-verification.component";

const routes: Routes = [
    { 
        path: '',
        component: LandingPageComponent,
        title: Title.home
    },
    {
        path: 'user-verification',
        component: UserVerificationComponent,
        title: Title.accoutVerification
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: Title.forgotPassword
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: Title.resetPassword
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }