import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { RouteConstants } from "src/app/data/enums/constatnts/route.constants";
import { AuthService } from "src/app/data/services/auth.service";
import { LocalStorage } from "src/app/data/services/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    routeConstants = RouteConstants;
    
    constructor(
        private localStorage: LocalStorage,
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const accessToken:string = this.localStorage.getItem('accessToken');
        if (accessToken) {
            const role = (this.authService.getRole());
            if (role == 'Employer') this.router.navigateByUrl(this.routeConstants.employerDashboard);
            else if (role == 'JobSeeker') this.router.navigateByUrl(this.routeConstants.jobSeekerHome);
            else this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}