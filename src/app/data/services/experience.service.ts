import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Experience } from "../models/experience.model";

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {

    host = `${environment.host}/Experience`;

    constructor(
        private httpClient: HttpClient
    ) {}

    addExperiences(experienceList: Experience[]) {
        return this.httpClient.post(`${this.host}/add`, experienceList);
    }
}