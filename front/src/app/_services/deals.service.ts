import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Deals } from '../_models';
import { from } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class DealsService {
    private token = localStorage.getItem('token');
    private url = 'http://localhost:3000/api/deals/';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': this.token,
        })
    };
    constructor(private http: HttpClient) { }

    /* private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            // return of(result as T);
        };
    }*/

    all() {
        console.log('OPtion requetthis. ', this.httpOptions.headers);
        console.log('URL', this.url)
        console.log(this.token)
        return this.http.get<any>(this.url, this.httpOptions)
    }
    one(id: string) {
        return this.http.get<any>(this.url + id, this.httpOptions);
    }
}
