import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  private baseUrl = 'http://localhost:8092/user/';

  constructor(private http: HttpClient) { }
  
  getUserList():Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
  
  getFournisseursList():Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}founisseurs`);
  }
  createUser(User: Object): any {
    return this.http.post(`${this.baseUrl}`, User);
  }
 

  updateUser(value: any): any {
    return this.http.put(`${this.baseUrl}`, value);
  }

  deleteUser(id: any): any {
    return this.http.delete(`${this.baseUrl}${id}`, { responseType: 'text' });
  }

  getUser(id: any): any {
    return this.http.get(`${this.baseUrl}${id}`);
  }
  getUserByUserNamePassword(value: any): any {
    return this.http.post(`${this.baseUrl}Role/`,value);
  }

}
