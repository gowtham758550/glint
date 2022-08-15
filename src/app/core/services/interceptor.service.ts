import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { LoaderService } from "./loader.service";
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from "src/app/data/services/local-storage.service";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        private loaderService: LoaderService,
        private toastr: ToastrService,
        private localStorage: LocalStorage
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.loaderService.show();
        const accessToken = this.localStorage.getItem('accessToken');
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return next.handle(req)
            .pipe(

                catchError((error: HttpErrorResponse) => {
                    setTimeout(() => {
                        // this.loaderService.hide();
                        this.toastr.error(error.error.title != undefined ? error.error.title : error.error, 'Error');
                        console.log(error.error);
                    }, 1000)
                    return throwError(error);
                }),
                finalize(() => {
                    // this.loaderService.hide();
                })
            )
    }
}