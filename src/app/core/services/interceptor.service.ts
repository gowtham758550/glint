import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { LoaderService } from "./loader.service";
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from "src/app/data/services/local-storage.service";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private localStorage: LocalStorage,
        private spinner: NgxSpinnerService
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
                    // this.loaderService.hide();
                    let errorMessage;
                    if (typeof error.error.errorMessage == 'string') errorMessage = error.error.errorMessage;
                    // else if (typeof error.error == 'string') errorMessage = error.error;
                    // else if (typeof error.error.error == 'string') errorMessage = error.error.error;
                    // else errorMessage = 'Unknow error'
                    this.toastr.error(errorMessage);
                    setTimeout(() => {
                        this.spinner.hide();
                    }, 1000)
                    return throwError(error);
                }),
                finalize(() => {
                    // this.loaderService.hide();
                })
            )
    }
}