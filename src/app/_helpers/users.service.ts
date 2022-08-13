import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from './interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  ServerURL: string = "http://localhost:4200/api/";
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get(this.ServerURL + "user");
  }
  deleteUsers(id: number) {
    return this.http.delete(`${this.ServerURL}user/${id}`);
  }
  getUser(userId: number) {
    return this.http.get(`${this.ServerURL}user/${userId}`);

  }

  updateUser(userd:user){
    return this.http.post<user>(`${this.ServerURL} user/${userd.id}`,`${userd}`);
  }
  addUser(userd:user){
    console.log(userd);
    return this.http.post<user>(`${this.ServerURL}user`,`${userd}`);
  }
}
