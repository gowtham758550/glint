import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstants } from "../data/enums/constatnts/route.constants";
import { Title } from "../data/enums/constatnts/title.constants";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

const routes: Routes = [
    { 
        path: '',
        component: LandingPageComponent,
        title: Title.home
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
    },
    {
        path: RouteConstants.notFound,
        component: NotFoundComponent,
        title: Title.notFound
    },
    // {
    //   path: '**',
    //   redirectTo: 'not-found'
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }