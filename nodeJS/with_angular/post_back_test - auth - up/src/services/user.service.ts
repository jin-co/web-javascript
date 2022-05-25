import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL: string = 'http://localhost:3000/user/';
  private token!: string;
  private isLogged: boolean = false;
  private userId!: string;

  userUpdated = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(`${this.baseURL}signup`, user).subscribe((result) => {
      console.log('service user added: ', result);
    });
  }

  login(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; exp: number; userId: string }>(
        `${this.baseURL}login`,
        user
      )
      .subscribe((data) => {
        console.log('service user logged in: ', data);
        this.userUpdated.next(true);
        this.token = data.token;
        this.isLogged = true;
        this.userId = data.userId;        
        this.router.navigate(['/']);
      });
  }

  logout() {
    this.token = '';
    this.userUpdated.next(false);
    this.isLogged = false;
    this.userId = '';
  }

  userUpdatedListener() {
    return this.userUpdated.asObservable();
  }

  getToken() {
    return this.token;
  }

  getIsLogged() {
    return this.isLogged;
  }

  getUserId() {
    return this.userId;
  }
}