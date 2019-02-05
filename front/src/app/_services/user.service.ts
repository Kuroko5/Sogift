import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { User } from '../_models';
import { from } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
    private token = localStorage.getItem('token');

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': this.token,
        })
    };
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`localhost:3000/api/users`, this.httpOptions);
    }
}
