import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Education } from "../models/education.model";

@Injectable({
    providedIn: 'root'
})
export class EducationService {

    host = `${environment.host}/Education`;

    constructor(
        private httpClient: HttpClient
    ) {}

    addEducations(educationList: Education[]) {
        return this.httpClient.post(`${this.host}/add`, educationList);
    }
}