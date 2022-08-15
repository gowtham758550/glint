import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

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
}