import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConstant } from '../component/app.constant';
import { Login } from '../ModuleClass/loginClass.module';
import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Atilce } from '../Menu/home/article';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  API_URL: string;
  APPEND_POINT: string;
  LOGIN_USER: string;
  ADD_NEW_USER: string;
  GETARTICLE: string;
  constructor(private http: HttpClient) {
    this.API_URL = AppConstant.API_ENDPOINT;
    this.APPEND_POINT = this.API_URL;
    this.LOGIN_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.USER_LOGIN;
    this.ADD_NEW_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.USER_LOGIN;
    this.GETARTICLE =  this.ADD_NEW_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.ARTICLES;

  }
  getLogin_User() {
    return this.http.get<Login[]>(this.LOGIN_USER).pipe(
      catchError(this.handleError)
    );
  }
  addNewUser(addNew) {
    return this.http.post(this.ADD_NEW_USER, addNew).pipe(
      catchError(this.handleError)
    );
  }
  getArticle() {
    return this.http.get<Atilce[]>(this.GETARTICLE).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(ex: HttpErrorResponse) {
    if (ex.error instanceof ErrorEvent) {
      alert('client side error');
    } else {
      alert('server side error');
    }
    return throwError('something went wrong');
  }

}
