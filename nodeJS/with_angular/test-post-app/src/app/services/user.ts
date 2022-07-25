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
        
        // auto auth
        this.router.navigate(['/']);
      });
  }

  logout() {
    // auto auth
    // auto auth
  }

  // auto auth
 
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
