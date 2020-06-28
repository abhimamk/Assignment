import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConstant } from '../component/app.constant';
import { Login } from '../ModuleClass/loginClass.module';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Article } from '../Menu/home/article';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  API_URL: string;
  APPEND_POINT: string;
  LOGIN_USER: string;
  ADD_NEW_USER: string;
  GETARTICLE: string;
  POSTARTICLE: string;
  EDITARTICLE: string;
  DELETEARTICLE: string;
  constructor(private http: HttpClient) {
    this.API_URL = AppConstant.API_ENDPOINT;
    this.APPEND_POINT = this.API_URL;
    this.LOGIN_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.USER_LOGIN;
    this.ADD_NEW_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.USER_LOGIN;
    this.GETARTICLE = this.ADD_NEW_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.ARTICLES;
    this.POSTARTICLE = this.ADD_NEW_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.ARTICLES;
    this.EDITARTICLE = this.ADD_NEW_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.EDIT_ARTICLE;
    this.DELETEARTICLE = this.ADD_NEW_USER = this.APPEND_POINT + AppConstant.API_CONFIG.API_URL.API.DELETE_ARTICLE;



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
    return this.http.get<Article[]>(this.GETARTICLE).pipe(
      catchError(this.handleError)
    );
  }
  addNewArticles(articles) {
    return this.http.post(this.POSTARTICLE, articles).pipe(
      catchError(this.handleError)
    );
  }

  editArticle(article, id) {
    return this.http.put(this.EDITARTICLE + id, article);
  }

  deleteArticle(id) {
    return this.http.delete(this.DELETEARTICLE + id);
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
