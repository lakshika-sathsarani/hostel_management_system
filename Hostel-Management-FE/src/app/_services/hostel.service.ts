import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:4000/api/';

@Injectable({
  providedIn: 'root',
})
export class HostelService {
  constructor(private http: HttpClient) {}

  getHostels(): Observable<any> {
    return this.http.get(URL + 'hostel');
  }

  getHostelById(id: string): Observable<any> {
    return this.http.get(URL + ` hostel/${id}`);
  }

  addHostel(data: any): Observable<any> {
    return this.http.post(URL + 'hostel', data);
  }

  updateHostel(data: any, id: string): Observable<any> {
    return this.http.put(URL + `hostel/${id}`, data);
  }

  deletHostel(id: string): Observable<any> {
    return this.http.delete(URL + `hostel/${id}`);
  }
}
