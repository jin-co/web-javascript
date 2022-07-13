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
        this.authTimer(data.exp)
        const now = new Date()
        const expDate = new Date(now.getTime() + data.exp * 1000)
        this.setAuthData(expDate)
        
        // auto auth
        this.router.navigate(['/']);
      });
  }

  logout() {
    // auto auth
    // auto auth
  }

  // auto auth
  authTimer(dur:number) {
    setTimeout(() => {
      this.logout()
    }, dur * 1000);
  }

  private setAuthData(exp: Date) {
    localStorage.setItem('token', this.token);
    localStorage.setItem('expDate', exp.toISOString());
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expDate');
    if(!token || !expDate) {
      return
    }
    return {
      token: token,
      expDate: new Date(expDate),
    };
  }

  removeAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
  }

  autoAuth() {
    const authInfo = this.getAuthData()
    console.log(authInfo)
    const now = new Date()
    if(typeof(authInfo) !== 'undefined') {
      const expIn = authInfo.expDate.getTime() - new Date().getTime()
      console.log(new Date().getTime())
      console.log(now.getTime())
      if(expIn > 0) {
        this.isLogged = true
        this.token = authInfo.token
        this.authTimer(expIn / 1000)
        this.userUpdate.next(true)
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
