import { JsonPipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BlobService {
  host = `${environment.host}/profile_picture`;
  constructor(private httpClient: HttpClient) {}

  getProfilePicture() {
    return this.httpClient.get(`${this.host}/get`);
  }

  addProfilePicture(profile: FormData) {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.httpClient.post(`${this.host}/add`, profile, options);
  }

  deleteProfilePicture() {
    return this.httpClient.delete(`${this.host}/delete`);
  }
}
