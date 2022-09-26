import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = `${environment.apiUrl}/users`;



  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<any[]>(this.apiUrl);
  }

  // Add product
  addUser(data: any) {
    return this.httpClient.post(this.apiUrl, data);
  }

  // update product
  updateUser(data: any): any {
    return this.httpClient.put(`${this.apiUrl}/${data.id}`,data);
  }

  // Delete product
  deleteUser(id: number): any {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
