import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private token!:string

  private userUpdated = new Subject<boolean>();
  baseURL: string = 'http://localhost:3000/user/';
  constructor(private http: HttpClient, private router: Router) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(`${this.baseURL}signup`, user).subscribe((result) => {
      console.log('added user');
      this.router.navigate(['/']);
    });
  }

  login(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post<{token:string, exp:number}>(`${this.baseURL}login`, user).subscribe((data) => {
      console.log('logged in: ', data);
      this.userUpdated.next(true)
      this.token = data.token
      this.router.navigate(['/']);
    });
  }

  logout() {
    this.token = ''
    this.userUpdated.next(false)
  }

  getToken() {
    return this.token
  }

  userUpdatedListener() {
    return this.userUpdated.asObservable()
  }
}
