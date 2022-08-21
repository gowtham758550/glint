import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: 'employer',
        loadChildren: () => import('./employer/employer.module').then(module => module.EmployerModule)
    },
    {
        path: 'job-seeker',
        loadChildren: () => import('./job-seeker/job-seeker.module').then(module => module.JobSeekerModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeaturesRoutingModule {}