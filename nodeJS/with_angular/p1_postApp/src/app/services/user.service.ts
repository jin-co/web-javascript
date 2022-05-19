import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseURL: string = 'http://localhost:3000/user/';
  token!: string;

  constructor(private http: HttpClient) {}

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
    });
  }

  getToken() {
    return this.token;
  }
}
