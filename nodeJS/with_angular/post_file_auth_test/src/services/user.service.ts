import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL: string = 'http://localhost:3000/user/';
  private isLogged: boolean = false;
  private token!: string;
  private userUpdate = new Subject<boolean>()

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
    this.http
      .post<{ token: string; exp: number }>(`${this.baseURL}login`, user)
      .subscribe((data) => {
        this.token = data.token;
        this.isLogged = true
        this.userUpdate.next(true)
        console.log(data);
        this.router.navigate(['/'])
      });
  }

  logout() {
      this.isLogged = false
      this.token = ''
      this.userUpdate.next(false)
      this.router.navigate(['/'])
  }

  getIsLogged() {
      return this.isLogged
  }

  userUpdateListener() {
      return this.userUpdate.asObservable()
  }

  getToken():string {
      return this.token
  }
}
