import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL_FOR_AUTH = "http://localhost:4300/api/auth";

  constructor(private httpClient: HttpClient) { }

  public sighUp(user: any) {
    return this.httpClient.post(`${this.BASE_URL_FOR_AUTH}/signup`, user)
  }

  public signIn(user: any) {
    return this.httpClient.post(`${this.BASE_URL_FOR_AUTH}/signin`, user)
  }

  public isLogin(): boolean {
    return sessionStorage.getItem('TOKEN') != null ? true : false;
  }

  public getId(): any {
    return sessionStorage.getItem('ID')
  }

  public getUsername(): any {
    return sessionStorage.getItem('USERNAME')
  }

  public getEmail(): any {
    return sessionStorage.getItem('EMAIL')
  }

  public getToken(): any {
    return sessionStorage.getItem('TOKEN')
  }

  public isAdmin(): any {
    let roles:any = sessionStorage.getItem('ROLES')!=null ? JSON.parse(sessionStorage.getItem('ROLES') || '{}') : null;
    return roles!=null ? roles.includes("ROLE_ADMIN") : false;
  }

  public logout(): any {
    return sessionStorage.clear();
  }
}

