import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url = 'http://localhost:3000/api/categories';
  user: any = localStorage.getItem('currentUser');
  token = this.authService.getToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'x-access-token': this.token,
  });

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(nb) {
    const header = new HttpHeaders();
    return this
      .http
      .get(`${this.url}?max=${nb}`, { headers: header });
  }
  getOne(id) {
    const header = new HttpHeaders();
    return this
      .http
      .get(`${this.url}/${id}`, { headers: header });
  }

  create(object: any) {
    console.log('header', this.headers);
    return this
      .http
      .post(`${this.url}`, object, { headers: this.headers });
  }
  update(id: string, category: any) {
    return this
      .http
      .put(`${this.url}/${id}`, category, { headers: this.headers });
  }
  delete(id: string) {
    return this
      .http
      .delete(`${this.url}/${id}`, { headers: this.headers });
  }
}
