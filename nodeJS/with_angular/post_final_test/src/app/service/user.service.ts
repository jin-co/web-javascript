import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userUpdated = new Subject<boolean>();
  baseURL:string = 'http://localhost:3000/user/'
  constructor(private http: HttpClient, private router: Router) {}

  addUser(email:string, password:string) {
      const user:User = {
        email: email,
        password: password
      }
      this.http.post(`${this.baseURL}`, user).subscribe(result => {
          console.log('added user')
      })
  }

  login(email:string, password:string) {}

  logout() {}
}
