import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL = 'http://localhost:3000/user/';

  //
  token!:string
  //

  constructor(private http: HttpClient, private router: Router) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(`${this.baseURL}signup`, user).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/']);
    });
  }

  signup(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post<{token:string, exp:number}>(`${this.baseURL}login`, user).subscribe((result) => {
        this.token = result.token
        
    });
  }
}
