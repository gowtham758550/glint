import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { JobCategory } from "../models/job-category.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    host = `${environment.host}/data`

    constructor(
        private httpClient: HttpClient
    ) {}

    getJobCategories(): Observable<JobCategory[]> {
        return this.httpClient.get<JobCategory[]>(`${this.host}/job_category/get`);
    }

    getQualifications() {
        return this.httpClient.get(`${this.host}/qualification_category/get`);
    }
}