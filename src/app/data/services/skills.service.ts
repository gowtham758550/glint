import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  host = `${environment.host}/skill`;

  constructor(private httpClient:HttpClient) { }

  getSkills(): Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(`${this.host}/get`);
  }
  addSkills(skillList: Skill[]){
    return this.httpClient.post(`${this.host}/add`, skillList);
  }
  deleteSkillbyId(id:number){
    return this.httpClient.delete(`${this.host}/delete/${id}`);
  }
  deleteSkill(){
    return this.httpClient.delete(`${this.host}/delete`);
  }
  getSkillsByUserId(id:number){
 return this.httpClient.get(`${this.host}/get_by_user_id/${id}`)
  }
}
