import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL = 'http://localhost:3000/auth/';
  private token!: string;
  private loggedIn: boolean = false;
  private authUpdate = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(this.baseURL + 'signup', user).subscribe((result) => {
      console.log('added a user', result);
      this.router.navigate(['/'])
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
        this.token = data.token;
        this.loggedIn = true;
        this.authUpdate.next(true);
        console.log('logged in: ', data)
        this.router.navigate(['/'])
      });
  }

  logout() {
    this.token = '';
    this.loggedIn = false;
    this.authUpdate.next(false);
  }

  getToken() {
    return this.token;
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  authUpdateListener() {
    return this.authUpdate.asObservable();
  }
}
