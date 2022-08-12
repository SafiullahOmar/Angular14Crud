import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
ServerURL:string="http://localhost:4200/api/";
  constructor(private http:HttpClient) { }
  getUsers(){
    return this.http.get(this.ServerURL+"user");
  }
}
