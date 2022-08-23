import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostJobService {
  host = `${environment.host}/post_job`

  constructor( private httpClient: HttpClient) { }

  getPostJobbyId(id:number){
    return this.httpClient.get(`${this.host}/get/${id}`);
  }

  getPostJob(): Observable<Object[]> {
    return this.httpClient.get<Object[]>(`${this.host}/get`);
  }
}
