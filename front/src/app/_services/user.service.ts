import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';

import { User } from '../_models';
import { AuthenticationService } from './authentication.service';
import { from } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
    private token = localStorage.getItem('token');
    private userLogged = localStorage.getItem('currentUser');
    private url = 'http://localhost:3000/api/users/';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': this.token,
        })
    };
    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    getAll(){
        console.log('OPtion requetthis. ', this.httpOptions);
        console.log('URL', this.url)
        console.log('TOKEN  ', this.token)
        const current = this.authService.currentUserValue;
        console.log('CURRENT ', current.token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': current.token,
            })
        };
        console.log('Find Token', httpOptions.headers)
        return this.http.get<any>(this.url, httpOptions).subscribe(data =>{
            console.log('DATA ',data)
            return data;
        })
    }
    getOne(id: string) {
        return this.http.get<User>(this.url + id, this.httpOptions);
    }
}
