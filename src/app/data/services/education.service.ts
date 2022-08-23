import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Education } from "../models/education.model";

@Injectable({
    providedIn: 'root'
})
export class EducationService {

    host = `${environment.host}/education`;

    constructor(
        private httpClient: HttpClient
    ) { }

    addEducations(educationList: Education[]) {
        return this.httpClient.post(`${this.host}/add`, educationList, { responseType: 'text' });
    }
    getEducation() {
        return this.httpClient.get(`${this.host}/get`)
    }
    getEducationById(id: number): Observable<Education> {
        return this.httpClient.get<Education>(`${this.host}/get/${id}`);
    }
    getEducationByUserId(id:number): Observable<Education>{
        return this.httpClient.get<Education>(`${this.host}/get_by_user_id/${id}`);
    }
    updateEducationById(id: number, updatedEducationDetail:Education) {
        return this.httpClient.put(`${this.host}/update_by_id`,updatedEducationDetail,{ responseType: 'text' })
    }
    deleteEducationById(id: number){
        return this.httpClient.delete(`${this.host}/delete/${id}`,{ responseType: 'text' });
    }
}