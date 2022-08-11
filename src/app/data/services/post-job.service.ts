import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostJobService {
  host = `${environment.host}/post_job`

  constructor( private httpClient: HttpClient) { }

  getPostJobbyId(id:number){
    console.log(id)
    return this.httpClient.get(`${this.host}/get/${id}`);
  }
}
