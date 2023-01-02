import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:4000/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(values: any): Observable<any> {
    return this.http.post(API + 'user/login', values, httpOptions);
  }

  register(values: any): Observable<any> {
    return this.http.post(API + 'user/', values, httpOptions);
  }

  //   logout(): Observable<any> {
  //     return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  //   }
}
