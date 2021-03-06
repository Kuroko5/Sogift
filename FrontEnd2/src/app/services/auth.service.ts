import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {

  }

  public get currentUserValue(): any {
    const user = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
  }
  getToken() {
    return localStorage.getItem('token');
  }

  async login(email: string, password: string) {
    return this.http.post<any>(`http://localhost:3000/api/login`, { email, password }).subscribe((user) => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        this.currentUserSubject.next(user);
        return this.router.navigateByUrl('/admin');
      }
      return this.router.navigateByUrl('/login');
    });
  }
  isLogged() {
    if (!localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    return this.isLogged();
  }
}
