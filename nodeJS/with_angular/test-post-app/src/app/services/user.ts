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

        const now = new Date()
        const expDate = new Date(now.getTime() + data.exp * 1000)

        this.saveAuthData(data.token, expDate)
        this.router.navigate(['/']);
      });
  }

  logout() {
    this.clearAuthData()
  }

  private saveAuthData(token: string, exp: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('exp', exp.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
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
