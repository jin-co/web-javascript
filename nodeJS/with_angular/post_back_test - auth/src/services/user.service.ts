import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';


@Injectable({ providedIn: 'root' })
export class UserService {
  baseURL = `http://localhost:3000/user/`;

  constructor(private http: HttpClient, private route: Router) {}

  addUser(email: string, password: string) {
      const user:User = {
        email: email,
        password: password
      }
      this.http.post(`${this.baseURL}signup`, user).subscribe(data => {
          console.log("added new user")
      })
  }
}
