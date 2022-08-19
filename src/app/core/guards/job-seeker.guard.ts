import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { RouteConstants } from "src/app/data/enums/constatnts/route.constants";
import { Role } from "src/app/data/enums/role.enum";
import { AuthService } from "src/app/data/services/auth.service";
import { LocalStorage } from "src/app/data/services/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class JobSeekerGuard implements CanActivate {

    routeConstants = RouteConstants;
    role = Role;

    constructor(
        private localStorage: LocalStorage,
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const accessToken: string = this.localStorage.getItem('accessToken');
        if (accessToken) {
            const role = this.authService.getRole();
            if (role == this.role.jobSeeker) {
                return true;
            } else if (role == this.role.employer) {
                this.router.navigateByUrl(this.routeConstants.employerDashboard);
                return false;
            }
        }
        this.router.navigateByUrl(this.routeConstants.jobSeekerLogin);
        return false;
    }
}