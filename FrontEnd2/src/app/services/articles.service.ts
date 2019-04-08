import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  url = 'http://localhost:3000/api/articles';
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2FhZjRmMWRiYTBmZDBkYmM0YTFlNGYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTQ3MjU0MjgsImV4cCI6MTU1NDc3MjIyOH0.cmxh4zDC0CWV6DIkSIenK1j02iAF61GXfWNl0gCtdvw';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': this.token,
  });

  constructor(private http: HttpClient) { }

  getAll() {
    console.log(this.token)
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
