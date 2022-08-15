import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { LoaderService } from "./loader.service";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        private loaderService: LoaderService,
        private toastr: ToastrService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.loaderService.isLoading);
        this.loaderService.show();
        return next.handle(req)
            .pipe(

                catchError((error: HttpErrorResponse) => {
                    setTimeout(() => {
                        this.loaderService.hide();
                        this.toastr.error(error.error != undefined ? error.error : error.error.title, 'Error');
                    }, 1000)
                    return throwError(error);
                }),
                finalize(() => {
                    this.loaderService.hide();
                })
            )
    }
}