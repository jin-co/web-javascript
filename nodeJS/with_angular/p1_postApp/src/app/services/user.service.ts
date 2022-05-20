import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseURL: string = 'http://localhost:3000/user/';
  token!: string;
  isAuthenticated: boolean = false;
  tokenTimer: any;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(`${this.baseURL}signup`, user).subscribe((data) => {});
  }

  login(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; expiresIn: number }>(`${this.baseURL}login`, user)
      .subscribe((data) => {
        this.token = data.token;
        console.log(this.token);

        const expiresInDuration = data.expiresIn;
        // this.tokenTimer = setTimeout(() => {
        //   this.logout();
        // }, expiresInDuration * 1000);
        this.setAuthTimer(expiresInDuration);

        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(this.token, expDate);
        this.router.navigate(['/']);
      });
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  logout() {
    console.log('clicked clicked');
    this.token = '';
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expDate', expDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
  }

  autoAuth() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const flag = authInfo?.expDate;
    const flag2 = authInfo?.token;
    if (typeof flag !== 'undefined') {
      // const isInFuture = flag > now
      const expIn = flag.getTime() - now.getTime();
      if (expIn > 0) {
        if (typeof flag2 !== 'undefined') {
          this.token = flag2;
        }
        this.isAuthenticated = true;
        this.setAuthTimer(expIn / 1000);
        this.authStatusListener.next(true);
      }
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expDate');
    if (!token || !expDate) {
      return;
    }
    return {
      token: token,
      expDate: new Date(expDate),
    };
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
