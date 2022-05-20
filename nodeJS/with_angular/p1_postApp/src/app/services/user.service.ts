import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseURL: string = 'http://localhost:3000/user/';
  token!: string;
  isAuthenticated:boolean = false

  private authStatusListener = new Subject<boolean>()

  constructor(private http: HttpClient, private router:Router) {}

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
    this.http.post<string>(`${this.baseURL}login`, user).subscribe((token) => {
      this.token = token;
      console.log(this.token)
      this.isAuthenticated = true
      this.authStatusListener.next(true)
      this.router.navigate(['/'])
    });
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  logout() {
    console.log('clicked clicked')
    this.token = ''
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.router.navigate(['/'])
  }
}
