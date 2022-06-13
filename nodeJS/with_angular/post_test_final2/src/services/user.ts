import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {
  private logged: boolean = false;
  private baseURL: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  addUser(email: string, password: string) {}

  login(email: string, password: string) {}

  getLogged() {
    return this.logged
  }
}
