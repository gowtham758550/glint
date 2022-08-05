import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/data/services/auth.service";
import { LocalStorage } from "src/app/data/services/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(
        private localStorage: LocalStorage,
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const accessToken:any = this.localStorage.getItem('accessToken');
        if (accessToken) {
            const role = (this.authService.getRole(accessToken));
            if (role == 'Employer') this.router.navigateByUrl('/employer/dashboard');
            else if (role == 'JobSeeker') this.router.navigateByUrl('/job-seeker/dashboard');
            else this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}