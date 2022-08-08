import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { changePasswordDTO } from "../models/change-password.model";

@Injectable({
    providedIn: 'root'
})
export class JobSeekerService {
    
    host = `${environment.host}/job_seeker_profile`;

    constructor(
        private httpClient: HttpClient
    ) {}

    updateProfile(userInfo: object) {
        return this.httpClient.put(`${this.host}/update`, userInfo);
    } 
    changeEmail(newEmail:string){
        return this.httpClient.put(
            `${this.host}/change_email`,
            newEmail, {responseType: 'text'}
          );
    }
    changePassword(changepassword: changePasswordDTO){
        return this.httpClient.put(
            `${this.host}/change_password`,
            changepassword, {responseType: 'text'}
          );
    }
    deleteProfile(){
        return this.httpClient.delete(`${this.host}/delete`);
    }
    
}