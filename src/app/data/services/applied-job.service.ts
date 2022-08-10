import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

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
    getAppliedJobId(){
        return this.httpClient.get<any[]>(`${this.host}/get`);
    }

    isApplied(postJobId?: number) {
        return this.httpClient.get(`${this.host}/is_applied/${postJobId}`);
    }
}