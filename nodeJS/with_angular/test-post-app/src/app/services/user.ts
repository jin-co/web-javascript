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
        this.setAuthData(this.token, expDate)
        // auto auth
        this.router.navigate(['/']);
      });
  }

  logout() {
    // auto auth
    // auto auth
  }

  // auto auth
  setAuthData(token:string, expDate:Date) {
    localStorage.setItem('token', token)
    localStorage.setItem('expDate', expDate.toISOString())
  } 

  clearAuthData(token:string, expDate:Date) {
    localStorage.removeItem('token')
    localStorage.removeItem('expDate')
  } 

  getAuthData() {
    const token = localStorage.getItem('token')
    const expDate = localStorage.getItem('expDate')
    if(!token || !expDate) return
    return {token: token, expDate: new Date(expDate)}
  } 

  autoAuth() {
    const authInfo = this.getAuthData()
    const now = new Date()
    if(typeof(authInfo) !== 'undefined') {
      const expIn = authInfo.expDate.getTime() - now.getTime()
      if(expIn > 0) {
        this.token = authInfo.token
        this.isLogged = true
        this.authTimer(expIn / 1000)
        this.userUpdate.next(true)
      }
    }
  }

  authTimer(exp:number) {
    setTimeout(() => {
      this.token = ''
      this.isLogged = false
      this.userUpdate.next(false) 
    }, exp * 1000)
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
