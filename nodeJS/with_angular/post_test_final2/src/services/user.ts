import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private logged: boolean = false;
  private baseURL: string = 'http://localhost:3000/auth/';
  private token!:string 
  private authUpdate = new Subject<boolean>()

  constructor(private http: HttpClient, private router: Router) {}

  addUser(email: string, password: string) {
    const user:User = {
      email: email,
      password: password
    }
    this.http.post(this.baseURL + 'signup', user).subscribe(result => {
      console.log("user added - service msg")
    })
  }

  login(email: string, password: string) {
    const user:User = {
      email: email,
      password: password
    }
    this.http.post<{token:string, exp:number}>(this.baseURL + 'login', user).subscribe(token => {
      this.token = token.token
      this.logged = true
      this.authUpdate.next(true)
      this.router.navigate(['/'])
    }) 
  }

  getLogged() {
    return this.logged
  }

  getToken() {
    return this.token
  }

  authUpdateListener() {
    return this.authUpdate.asObservable()
  }

  logout() {
    this.token = ''
    this.logged = false
    this.authUpdate.next(false)
  }
}
