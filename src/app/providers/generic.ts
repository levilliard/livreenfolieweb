import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { map, filter, tap } from 'rxjs/operators';

import { AppSettings } from './app-settings';
import { Authentication, User } from '../models/models';


@Injectable({
  providedIn: 'root',
}
)
export class GenericProvider {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  public getArrayOfObject(uri: string): Observable<Object[]> {
    const url = AppSettings.URL_BASE + uri;
    return this.http.get<Object[]>(`${url}`);
  }

  public updateObject(body: Object, uri: string): Observable<Object> {
    const bodyStr = JSON.stringify(body);
    const url = AppSettings.URL_BASE + uri;

    return this.http.put(
      url,
      bodyStr,
      this.httpOptions
    );
  }

  public getCounted(uri: string): Observable<number>{
    const url = AppSettings.URL_BASE + uri;
    return this.http.get<number>(`${url}`);
  }
  
  public addObject(body: Object, uri: string): Observable<Object> {
    const bodyStr = JSON.stringify(body);

    const url = AppSettings.URL_BASE + uri;
    return this.http.post(
      url,
      bodyStr,
      this.httpOptions
    );
  }


  public filterData(body: Object, uri: string): Observable<Object> {
    const bodyStr = JSON.stringify(body);

    const url = AppSettings.URL_BASE + uri;
    return this.http.post<Object[]>(
      url,
      bodyStr,
      this.httpOptions
    );
  }

  public deleteObj(id: string, uri): Observable<Object> {
    const url = AppSettings.URL_BASE + uri + '/' + id;
    return this.http.delete(`${url}`);
  }

  public login(uri: string, username: string, password: string){
    let user = new User();
    user.login = username;
    user.password = password;
    const bodyStr = JSON.stringify(user);
    console.log("Object to save: ", bodyStr);

    const url = AppSettings.URL_BASE + uri;
    return this.http.post(
      url,
      bodyStr,
      this.httpOptions
    );
  }
}
