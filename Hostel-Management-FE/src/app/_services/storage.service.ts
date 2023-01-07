import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUser(): any {
    const token = window.sessionStorage.getItem(USER_KEY);
    if (token) {
      const decode: any = jwt_decode(token);
      const user = decode.data;
      return user;
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
