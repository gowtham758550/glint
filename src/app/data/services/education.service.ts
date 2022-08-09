import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Education } from "../models/education.model";

@Injectable({
    providedIn: 'root'
})
export class EducationService {

    host = `${environment.host}/education`;

    constructor(
        private httpClient: HttpClient
    ) {}

    addEducations(educationList: any) {
        console.log(educationList);
        return this.httpClient.post(`${this.host}/add`, educationList, {responseType: 'text'});
    }
    getEducation(){
        return this.httpClient.get(`${this.host}/get`)
    }
}