import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL = 'http://localhost:3000/user/';

  //
  private token!: string;
  private isLogged: boolean = false;
  private authUpdated = new Subject<boolean>();
  //

  constructor(private http: HttpClient, private router: Router) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(`${this.baseURL}signup`, user).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/']);
    });
  }

  login(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; exp: number }>(`${this.baseURL}login`, user)
      .subscribe((data) => {
        this.token = data.token;
        this.isLogged = true;
        this.authUpdated.next(true);

        this.setAuthTimer(data.exp);
        const now = new Date();
        const expDate = new Date(now.getTime() + data.exp * 1000);
        this.saveData(data.token, expDate);
        this.router.navigate(['/']);
      });
  }

  getToken() {
    return this.token;
  }

  authUpdatedListener() {
    return this.authUpdated.asObservable();
  }

  getIsLogged() {
    return this.isLogged;
  }

  logout() {
    this.isLogged = false;
    this.token = '';
    this.authUpdated.next(false);
    this.clearData();
    this.router.navigate(['/']);
  }

  private saveData(token: string, exp: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('date', exp.toISOString());
  }

  private clearData() {
    localStorage.removeItem('token');
    localStorage.removeItem('date');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('date');
    if (!token || !expDate) {
      return;
    }
    return {
      token: token,
      expDate: new Date(expDate),
    };
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    const now = new Date();
    let isInFuture;
    if (typeof authInfo !== 'undefined') {
      isInFuture = authInfo?.expDate > now;
      if (isInFuture) {
        this.token = authInfo?.token;
        this.isLogged = true;
        this.authUpdated.next(true);
      }
    }
  }

  setAuthTimer(dur: number) {
    setTimeout(() => {
      this.logout();
    }, dur * 1000);
  }
}
