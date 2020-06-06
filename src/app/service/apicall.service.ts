import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppConstant } from '../component/app.constant';
import { Login } from '../ModuleClass/loginClass.module';
@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  API_URL: string;
  APPEND_POINT: string;
  LOGIN_USER: string;
  ADD_NEW_USER: string;
  constructor(private http: HttpClient) {
    this.API_URL = AppConstant.API_ENDPOINT;
    this.APPEND_POINT = this.API_URL;
    this.LOGIN_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.USER_LOGIN;
    this.ADD_NEW_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.USER_LOGIN;

   }
   getLogin_User() {
     return this.http.get<Login[]>(this.LOGIN_USER);
   }
   addNewUser(addNew) {
     return this.http.post(this.ADD_NEW_USER, addNew);
   }
}
