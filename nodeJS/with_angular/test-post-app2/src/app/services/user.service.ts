import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private isLogged: boolean = false;
  private token!: string;
  private userUpdate = new Subject<boolean>();
  private baseURL: string = 'http://localhost:3000/user/';

  constructor(private router: Router, private http: HttpClient) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(this.baseURL, user).subscribe((result) => {
      this.router.navigate(['/']);
    });
  }

  login(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; exp: number }>(this.baseURL, user)
      .subscribe((data) => {
        this.token = data.token;
        this.userUpdate.next(true);
        this.isLogged = true;
      });
  }

  userUpdataListener() {
    return this.userUpdate.asObservable();
  }
}
