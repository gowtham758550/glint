import { JsonPipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProfilePictureResponse } from "../models/profile-picture-response.model";

@Injectable({
  providedIn: "root",
})
export class BlobService {
  host = `${environment.host}/profile_picture`;
  constructor(private httpClient: HttpClient) {}

  getProfilePicture(): Observable<ProfilePictureResponse> {
    return this.httpClient.get<ProfilePictureResponse>(`${this.host}/get`);
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
