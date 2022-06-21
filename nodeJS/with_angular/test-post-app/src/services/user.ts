import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

export class UserService {
  private baseURL = 'http://localhost:3000/auth/'

  constructor(private router: Router, private http: HttpClient) {}
}