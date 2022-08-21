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
  profilePictureHost = `${environment.host}/profile_picture`;
  coverPictureHost= `${environment.host}/cover_picture`;
  resumeHost=`${environment.host}/resume`;
  constructor(private httpClient: HttpClient) { }

  // -----------------------------Profile Picture Service-----------------------------------------

  getProfilePicture(): Observable<ProfilePictureResponse> {
    return this.httpClient.get<ProfilePictureResponse>(`${this.profilePictureHost}/get`);
  }

  getProfilePicturebyId(user_id: number): Observable<ProfilePictureResponse> {
    return this.httpClient.get<ProfilePictureResponse>(`${this.profilePictureHost}/get/${user_id}`);
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

  // -------------------------------Cover Picture Service-----------------------------------

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

  //  -----------------------------Resume Service------------------------------------------
  getResume(): Observable<any> {
    return this.httpClient.get<any>(`${this.resumeHost}/get`);
  }

  getResumebyId(id: number){
    return this.httpClient.get<any>(`${this.resumeHost}/get_by_user_id/${id}`);
  }

  addResume(resume: FormData) {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    console.log(resume);

    return this.httpClient.post(`${this.resumeHost}/add`, resume, options);
  }

  deleteResume() {
    return this.httpClient.delete(`${this.resumeHost}/delete`);
  }



}
