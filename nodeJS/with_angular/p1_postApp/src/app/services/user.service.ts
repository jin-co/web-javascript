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
  userId!: string;

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
      .post<{ token: string; expiresIn: number; userId: string }>(
        `${this.baseURL}login`,
        user
      )
      .subscribe((data) => {
        this.token = data.token;
        console.log(this.token);

        const expiresInDuration = data.expiresIn;
        // this.tokenTimer = setTimeout(() => {
        //   this.logout();
        // }, expiresInDuration * 1000);
        this.setAuthTimer(expiresInDuration);
        this.userId = data.userId;
        console.log(this.userId)
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(this.token, expDate, this.userId);
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
    this.userId = '';
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expDate', expDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    localStorage.removeItem('userId');
  }

  autoAuth() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    if (typeof authInfo !== 'undefined' ) {
      // const isInFuture = flag > now
      const expIn = authInfo.expDate.getTime() - now.getTime();
      if (expIn > 0) {
        this.token = authInfo.token;
        this.isAuthenticated = true;
        if(authInfo.userId !== null) {
          this.userId = authInfo.userId
        }
        this.setAuthTimer(expIn / 1000);
        this.authStatusListener.next(true);
      }
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expDate');
    const userId = localStorage.getItem('userId');
    if (!token || !expDate) {
      return;
    }
    return {
      token: token,
      expDate: new Date(expDate),
      userId: userId,
    };
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  getUserId() {
    return this.userId;
  }
}
