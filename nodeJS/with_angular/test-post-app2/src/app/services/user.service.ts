import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private isLogged: boolean = false;
  private token!: string;
  private userUpdate = new Subject<boolean>();
  private baseURL: string = 'http://localhost:3000/user/';

  constructor(private router: Router, private http: HttpClient) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(this.baseURL + 'signup', user).subscribe((result) => {
      this.router.navigate(['/']);
    });
  }

  login(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; exp: number }>(this.baseURL + 'login', user)
      .subscribe((data) => {
        this.token = data.token;
        this.userUpdate.next(true);
        this.isLogged = true;
        //auto auth
        const now = new Date();
        const expDate = new Date(now.getTime() + data.exp * 1000);
        this.authTimer(data.exp);
        this.setAuth(expDate);
        //auto auth
        this.router.navigate(['/']);
      });
  }

  //auto auth
  autoAuth() {
    const authInfo = this.getAuth();
    if (typeof authInfo !== 'undefined') {
      const now = new Date();
      const expIn = authInfo.expDate.getTime() - now.getTime();
      if (expIn > 0) {
        this.token = authInfo.token;
        this.isLogged = true;
        this.userUpdate.next(true);
        this.authTimer(expIn / 1000)
      } 
    }
  }

  private setAuth(expDate: Date) {
    localStorage.setItem('token', this.token);
    localStorage.setItem('expDate', expDate.toISOString());
  }

  private getAuth() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expDate');
    if (!token || !expDate) return;
    return {
      token: token,
      expDate: new Date(expDate),
    };
  }

  private removeAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
  }

  private authTimer(exp: number) {
    setTimeout(() => {
      this.logout();
    }, exp * 1000);
  }

  logout() {
    this.removeAuth();
    this.token = '';
    this.isLogged = false;
    this.userUpdate.next(false);
  }
  //auto auth

  userUpdateListener() {
    return this.userUpdate.asObservable();
  }

  getToken() {
    return this.token;
  }

  getIsLogged() {
    return this.isLogged;
  }
}
