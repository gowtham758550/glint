import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    host = `${environment.host}/data`

    constructor(
        private httpClient: HttpClient
    ) {}

    getCategories() {
        return this.httpClient.get(`${this.host}/job_category/get`);
    }

    getQualifications() {
        return this.httpClient.get(`${this.host}/qualification_category/get`);
    }
}