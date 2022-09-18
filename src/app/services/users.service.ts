import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from  '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl:string  = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<any[]>(this.apiUrl);
  }
}
