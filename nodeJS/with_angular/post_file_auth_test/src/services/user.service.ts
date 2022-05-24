import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseURL: string = 'http://localhost:3000/user/';
  constructor(private router: Router, private http: HttpClient) {}

  addUser(email: string, password: string) {
    console.log('user service add user: ', email);
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(`${this.baseURL}signup`, user).subscribe((result) => {
      console.log(result);
    });
  }

  login(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(`${this.baseURL}login`, user).subscribe((data) => {
      console.log(data);
    });
  }

  logout() {}
}
