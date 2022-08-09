import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Job } from "../models/job.model";

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    host = `${environment.host}/filter`;

    constructor(
        private httpClient: HttpClient
    ) {}

    getJobAppliers(postJobId: number) {
        return this.httpClient.get(`${this.host}/applied_job_list/get/${postJobId}`);
    }

    getAllJobs(): Observable<Job[]> {
        return this.httpClient.get<Job[]>(`${this.host}/post_job_list/get`);
    }
}