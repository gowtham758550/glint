import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EducationInfo } from "../models/education-info.model";
import { Education } from "../models/education.model";

@Injectable({
    providedIn: 'root'
})
export class EducationService {

    host = `${environment.host}/education`;

    constructor(
        private httpClient: HttpClient
    ) { }

    addEducations(educationList: any) {
        console.log(educationList);
        return this.httpClient.post(`${this.host}/add`, educationList, { responseType: 'text' });
    }
    getEducation() {
        return this.httpClient.get<EducationInfo[]>(`${this.host}/get`)
    }
    getEducationById(id: number) {
        return this.httpClient.get<any>(`${this.host}/get/${id}`);
    }
    getEducationByUserId(id:number){
        return this.httpClient.get<any>(`${this.host}/get_by_user_id/${id}`);
    }
    updateEducationById(id: number, updatedEducationDetail:any) {
        return this.httpClient.put(`${this.host}/update_by_id`,updatedEducationDetail,{ responseType: 'text' })
    }
    deleteEducationById(id: number){
        console.log(id);
        return this.httpClient.delete(`${this.host}/delete/${id}`,{ responseType: 'text' });
    }
}