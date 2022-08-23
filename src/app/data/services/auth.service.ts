import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwtDecode from "jwt-decode";

import { LocalStorage } from './local-storage.service';
import { Role } from '../enums/role.enum';
import { AccessToken } from '../models/access-token.model';
import { Claims } from '../models/claims.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host = `${environment.host}/auth`;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorage
  ) { }

  signup(userInfo: object): Observable<AccessToken> {
    return this.httpClient.post<AccessToken>(`${this.host}/register`, userInfo);
  }

  isVerified(email: string) {
    let params = new HttpParams();
    params = params.append('mailId', email);
    return this.httpClient.get(`${this.host}/is_verified`, { params: params })
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

  resetPassword(data: object): Observable<AccessToken> {
    return this.httpClient.post<AccessToken>(`${this.host}/reset_password`, data);
  }

  getUserId(accessToken: string) {
    const claims: Claims = jwtDecode(accessToken);
    return claims.UserId;
  }

  getRole(): Role {
    const token: string = this.localStorage.getItem('accessToken');
    const claims: Claims = jwtDecode(token);
    return claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  getEmail(): string {
    const token: string = this.localStorage.getItem('accessToken');
    const claims: Claims = jwtDecode(token);
    return claims.Email;
  }
  getUserName(): string {
    const token: string = this.localStorage.getItem('accessToken');
    const claims: Claims = jwtDecode(token);
    return claims.UserName;
  }

  deleteProfile() {
    return this.httpClient.delete(`${this.host}/delete`, { responseType: 'text' });
  }
}
