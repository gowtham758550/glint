import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { RegisterComponent } from "./components/User-register/register.component";

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    {path:'register' , component: RegisterComponent},
    {path:'login' , component: UserLoginComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }