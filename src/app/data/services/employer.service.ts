import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

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
}