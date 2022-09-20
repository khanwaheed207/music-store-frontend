import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from  '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl1:string  = `${environment.apiUrl}/users`;
  private apiUrl2:string  = `${environment.apiUrl}/users/:id`;



  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<any[]>(this.apiUrl1);
  }

   // Add product
   addUser(data: any) {
    return this.httpClient.post(this.apiUrl1, data);
  }

   // update product
   updateUser(data: any) {
    return this.httpClient.put(this.apiUrl2, data);
  }

  // Delete product
  deleteUser(data: any) {
    return this.httpClient.delete(this.apiUrl2, data);
  }
}
