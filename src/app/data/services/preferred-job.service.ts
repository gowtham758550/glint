import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreferredJob } from '../models/preferred-job.model';

@Injectable({
  providedIn: 'root'
})
export class PreferredJobService {
  
  host = `${environment.host}/preferred_job`;

  constructor(private httpClient:HttpClient) { }

  getPreferredJob(): Observable<PreferredJob>{
    return this.httpClient.get<PreferredJob>(`${this.host}/get`);
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
