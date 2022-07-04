import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL: string = 'http://localhost:3000/user';
  private token!: string;
  private isLogged: boolean = false;
  private userUpdate = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  addUser(email: string, password: string) {
    const user: User = {
      email: email,
      password: password,
    };
    this.http.post(this.baseURL, user).subscribe((result) => {
      this.router.navigate(['/'])
    });
  }

  login(email: string, password: string) {}

  logout() {}

  userUpdateListener() {
    return this.userUpdate.asObservable();
  }
}
