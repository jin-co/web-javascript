import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseURL: string = 'http://localhost:3000/user/';

  constructor(private router: Router, private http: HttpClient) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(`${this.baseURL}`, user).subscribe((result) => {
      console.log('service user added: ', result);
    });
  }
}
