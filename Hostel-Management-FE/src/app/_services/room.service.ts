import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:4000/api/';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return this.http.get(URL + 'room');
  }

  getRoomById(id: string): Observable<any> {
    return this.http.get(URL + `room/${id}`);
  }

  getRoomByHostelId(hostelId: string): Observable<any> {
    return this.http.get(URL + `room/by-hostel/${hostelId}`);
  }

  addRoom(data: any): Observable<any> {
    return this.http.post(URL + 'room', data);
  }

  updateRoom(data: any, id: string): Observable<any> {
    return this.http.put(URL + `room/${id}`, data);
  }

  deletRoom(id: string): Observable<any> {
    return this.http.delete(URL + `room/${id}`);
  }
}
