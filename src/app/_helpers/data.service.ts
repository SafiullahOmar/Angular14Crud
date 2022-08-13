import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { user } from './interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }
  createDb(reqInfo?: RequestInfo) {
    let user:user[]=[{
      id:10,title:"Mr",firstName:"adf",lastName:"khan",dob:'2000-05-15',email:"aa@gmail.com",password:"1245",accept:true
    }];
    return {user};
  }
}
