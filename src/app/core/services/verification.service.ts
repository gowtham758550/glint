import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class VerificationService {

    host: string = `${environment.host}/auth`

    constructor(
        private httpClient: HttpClient
    ) {}

    verifyWithToken(token: string) {
        const params = new HttpParams().set('token', decodeURIComponent(token))
        console.log(params.get('token'));
        return this.httpClient.get(`${this.host}/verify`, {params: params});
    } 
}