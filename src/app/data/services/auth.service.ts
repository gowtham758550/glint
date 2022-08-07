import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwtDecode from "jwt-decode";
import { LocalStorage } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host = `${environment.host}/auth`;

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

  getRole(accessToken: string) {
    const claims: any = jwtDecode(accessToken);
    return claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
}
