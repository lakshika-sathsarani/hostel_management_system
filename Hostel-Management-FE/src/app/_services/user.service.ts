import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:4000/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(URL + 'user');
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(URL + `user/${userId}`);
  }
}
