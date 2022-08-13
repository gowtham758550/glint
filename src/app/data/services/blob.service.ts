import { JsonPipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BlobService {
  profilePictureHost = `${environment.host}/profile_picture`;
  coverPictureHost= `${environment.host}/cover_picture`;
  constructor(private httpClient: HttpClient) { }

  getProfilePicture() {
    return this.httpClient.get(`${this.profilePictureHost}/get`);
  }

  addProfilePicture(profile: FormData) {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.httpClient.post(`${this.profilePictureHost}/add`, profile, options);
  }

  deleteProfilePicture() {
    return this.httpClient.delete(`${this.profilePictureHost}/delete`);
  }

  getCoverPicture() {
    return this.httpClient.get(`${this.coverPictureHost}/get`);
  }

  addCoverPicture(coverPicture: FormData) {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.httpClient.post(`${this.coverPictureHost}/add`, coverPicture, options);
  }

  deleteCoverPicture() {
    return this.httpClient.delete(`${this.coverPictureHost}/delete`);
  }



}
