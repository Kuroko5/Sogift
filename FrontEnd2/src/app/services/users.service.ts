import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:3000/api/users';
  token = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': this.token,
  });

  constructor(private http: HttpClient) { }

  getAll() {
    return this
      .http
      .get(`${this.url}`, { headers: this.headers });
  }
  getOne(id) {
    return this
      .http
      .get(`${this.url}/${id}`, { headers: this.headers });
  }
}
