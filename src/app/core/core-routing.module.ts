import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { LoginComponent } from "./components/login/login.component";
import { UserVerificationComponent } from "./components/user-verification/user-verification.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    { 
        path: '',
        component: LandingPageComponent
    },
    { 
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user-verification',
        component: UserVerificationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }