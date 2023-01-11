import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:4000/api/';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  reservation(hostel: any, id: string): Observable<any> {
    return this.http.patch(URL + `user/${id}`, hostel);
  }
}
