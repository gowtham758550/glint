import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { changePasswordDTO } from "../models/change-password.model";

@Injectable({
    providedIn: 'root'
})
export class EmployerService {

    host = `${environment.host}/employer_profile`;

    constructor(
        private httpClient: HttpClient
    ) {}

    updateEmployerProfile(employerProfile: object) {
        return this.httpClient.put(`${this.host}/update`, employerProfile);
    }
    updateProfile(userInfo: object): Observable<any>  {
        console.log(userInfo);
        return this.httpClient.put(`${this.host}/update`, userInfo);
    } 
    changePassword(passwordObject: changePasswordDTO){
        return this.httpClient.put(`${this.host}/change_password`, passwordObject,{responseType: 'text'});
    }
    changeEmail(email:string){
        console.log(email);
        return this.httpClient.get(`${this.host}/change_email/${email}`, {responseType: 'text'});
    }
    getUserById(id: number){
        return this.httpClient.get(`${this.host}/get/?id=${id}`)
    }

}