import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Experience } from "../models/experience.model";

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {

    host = `${environment.host}/experience`;

    constructor(
        private httpClient: HttpClient
    ) {}

    addExperiences(experienceList: any) {
        console.log(experienceList);
        return this.httpClient.post(`${this.host}/add`, experienceList, { responseType: 'text' });
    }
    getExperience() {
        return this.httpClient.get(`${this.host}/get`)
    }
    getExperienceById(id: number) {
        return this.httpClient.get<any>(`${this.host}/get/${id}`);
    }
    updateExperienceById(id: number, updatedExperienceDetail:any) {
        return this.httpClient.put(`${this.host}/update_by_id`,updatedExperienceDetail,{ responseType: 'text' })
    }
    deleteExperienceById(id: number){
        console.log(id);
        return this.httpClient.delete(`${this.host}/delete/${id}`,{ responseType: 'text' });
    }
}