import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreferredJobService {
  
  host = `${environment.host}/preferred_job`;

  constructor(private httpClient:HttpClient) { }

  getPreferredJob(){
    return this.httpClient.get<any>(`${this.host}/get`);
  }
  addPreferredJob(preferredJobList: object[]){
    return this.httpClient.post(`${this.host}/add`, preferredJobList);
  }
  deletePreferredJobbyId(id:number){
    return this.httpClient.delete(`${this.host}/delete/${id}`);
  }
  deletePreferredJob(){
    return this.httpClient.delete(`${this.host}/delete`);
  }
}
