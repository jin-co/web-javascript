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
  private tokenTimer:any

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

        const now = new Date();
        const expDate = new Date(now.getTime() + data.exp * 1000);

        this.saveAuthData(data.token, expDate);

        this.setAuthTimer(data.exp)
        this.router.navigate(['/']);
      });
  }

  logout() {
    this.clearAuthData();
  }

  private saveAuthData(token: string, exp: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('exp', exp.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
  }

  autoAuth() {
    const authInfo = this.getAuthData();
    const now = new Date()
    if(typeof(authInfo) !== 'undefined') {
      const isInFuture = authInfo.exp.getTime() - now.getTime()
      
      if(isInFuture > 0) {
        this.token = authInfo.token
        this.isLogged = true
        this.setAuthTimer(isInFuture / 1000)
        this.userUpdate.next(true)
      }
    }
  }

  private setAuthTimer(duration:number) {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const exp = localStorage.getItem('exp');
    if (!token || !exp) {
      return;
    }
    return {
      token: token,
      exp: new Date(exp),
    };
  }

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
