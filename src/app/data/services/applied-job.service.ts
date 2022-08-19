import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Status } from "../enums/status.enum";
import { AppliedJob } from "../models/applied-job.model";

@Injectable({
    providedIn: 'root'
})
export class AppliedJobService {

    host = `${environment.host}/applied_job`

    constructor(
        private httpClient: HttpClient
    ) {}

    applyJob(postJobId?: number) {
        const applyJobPayload = {
            postJobId: postJobId,
            jobStatus: 'Pending'
        }
        return this.httpClient.post(`${this.host}/add`, applyJobPayload);
    }

    updateAppliedJobStatus(appliedJobId: number, postJobId: number, status: Status) {
        const payload = {
            appliedJobID: appliedJobId,
            jobStatus: status,
            postJobId: postJobId
        }
        return this.httpClient.put(`${this.host}/update`, payload);
    }

    getAppliedJobs(): Observable<AppliedJob[]> {
        return this.httpClient.get<AppliedJob[]>(`${this.host}/get`);
    }

    getAppliedJobWithJobId() {
        
    }

    isApplied(postJobId?: number) {
        return this.httpClient.get(`${this.host}/is_applied/${postJobId}`);
    }
}