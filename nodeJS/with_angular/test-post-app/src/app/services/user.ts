import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL: string = 'http://localhost:3000/user/';
  private token!: string;
  private isLogged: boolean = false;
  private userUpdate = new Subject<boolean>();
  private tokenTimer: any;
  private userId!: string;

  constructor(private http: HttpClient, private router: Router) {}

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
        console.log('login result: ', data);
        this.isLogged = true;
        this.token = data.token;
        this.userUpdate.next(true);

        // auto auth
        this.setAuthTimer(data.exp);
        const now = new Date()
        const expDate = new Date(now.getTime() + data.exp * 1000)
        this.saveAuthDate(this.token, expDate)
        // auto auth
        this.router.navigate(['/']);
      });
  }

  logout() {
    // auto auth
    // auto auth
  }

  // auto auth
  private saveAuthDate(token: string, expDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expDate', expDate.toISOString());
    
  }

  private clearAuthDate() {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    
  }

  getAuthData() {
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
    console.log('timer ', duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuth() {
    const authInfo = this.getAuthData();
    const now = new Date();
    if (typeof authInfo !== 'undefined') {
      const expIn = authInfo.expDate.getTime() - now.getTime();
      if (expIn > 0) {
        this.token = authInfo.token;
        this.isLogged = true;        
        this.setAuthTimer(expIn / 1000);
        this.userUpdate.next(true);
      }
    }
  }

  // auto auth

  getToken() {
    return this.token;
  }

  getIsLogged() {
    return this.isLogged;
  }

  userUpdateListener() {
    return this.userUpdate.asObservable();
  }
}
