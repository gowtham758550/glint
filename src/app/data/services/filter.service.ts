import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Appliers } from "../models/appliers.model";
import { BarChartData } from "../models/barchart-data.model";
import { Job } from "../models/job.model";

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    host = `${environment.host}/filter`;

    constructor(
        private httpClient: HttpClient
    ) {}

    getJobAppliers(postJobId: number): Observable<Appliers[]> {
        return this.httpClient.get<Appliers[]>(`${this.host}/applied_job_list/get/${postJobId}`);
    }

    getAllJobs(filters: string): Observable<Job[]> {
        return this.httpClient.get<Job[]>(`${this.host}/post_job_list/get?filters=${filters}`);
    }

    getNonAppliedJobs(filters: string): Observable<Job[]> {
        return this.httpClient.get<Job[]>(`${this.host}/post_job_list/get_non_applied_job?filters=${filters}`);
    }

    getPostJobCount(): Observable<number> {
        return this.httpClient.get<number>(`${this.host}/post_job_count/get`);
    }

    getEmployerCount(): Observable<number> {
        return this.httpClient.get<number>(`${this.host}/employer_count/get`);
    }

    getJobSeekerCount(): Observable<number> {
        return this.httpClient.get<number>(`${this.host}/job_seeker_count/get`);
    }
    getJobSeekerCountByJobId(id:number): Observable<number> {
        return this.httpClient.get<number>(`${this.host}/job_seeker_count/get/${id}`);
    }

    getBarChartData(): Observable<BarChartData> {
        return this.httpClient.get<BarChartData>(`${this.host}/bar_chart/get`);
    }

    getPieChartData() {
        return this.httpClient.get(`${this.host}/pie_chart/get`);
    }
}