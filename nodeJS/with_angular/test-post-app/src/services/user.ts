import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class UserService {
  private baseURL = 'http://localhost:3000/auth/'

  constructor(private router: Router, private http: HttpClient) {}
}