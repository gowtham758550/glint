import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwtDecode from "jwt-decode";
import { LocalStorage } from './local-storage.service';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host = `${environment.host}/auth`;
  accessToken = this.localStorage.getItem('accessToken');
  claims: any = jwtDecode(this.accessToken);

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorage
  ) { }

  signup(userInfo: object): Observable<any> {
    return this.httpClient.post(`${this.host}/register`, userInfo);
  }

  isVerified(email: string) {
    let params = new HttpParams();
    params=params.append('mailId',email);
    return this.httpClient.get(`${this.host}/is_verified`, {params : params})
  }

  login(credentials: object) {
    return this.httpClient.post(`${this.host}/login`, credentials);
  }

  logout() {
    this.localStorage.removeItem('accessToken');
  }

  forgotPassword(info: object) {
    return this.httpClient.post(`${this.host}/forgot_password`, info);
  }

  resetPassword(data: object) {
    return this.httpClient.post(`${this.host}/reset_password`, data);
  }

  getUserId(accessToken:string){
    const claims:any=jwtDecode(accessToken);
    return claims['UserID']
  }

  getRole(): Role {
    return this.claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  getEmail() {
    return this.claims['Email'];
  }
  getUserName() {
    return this.claims['UserName'];
  }

  deleteProfile(){
    return this.httpClient.delete(`${this.host}/delete`, {responseType: 'text'});
}
}
