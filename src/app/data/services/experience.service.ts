import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

    addExperiences(experienceList: Experience[]) {
        return this.httpClient.post(`${this.host}/add`, experienceList, { responseType: 'text' });
    }
    getExperience(): Observable<Experience> {
        return this.httpClient.get<Experience>(`${this.host}/get`)
    }
    getExperienceById(id: number) {
        return this.httpClient.get<Experience>(`${this.host}/get/${id}`);
    }
    getExperienceByUserId(id: number){
        return this.httpClient.get<Experience>(`${this.host}/get_by_user_id/${id}`);

    }
    updateExperienceById(id: number, updatedExperienceDetail:Experience) {
        return this.httpClient.put(`${this.host}/update_by_id`,updatedExperienceDetail,{ responseType: 'text' })
    }
    deleteExperienceById(id: number){
        return this.httpClient.delete(`${this.host}/delete/${id}`,{ responseType: 'text' });
    }
}