import { HttpClient } from '@angular/common/http';

export class PostService {
  constructor(private http: HttpClient) {}
    baseURL:String = 'http://localhost:3000/'
  setPosts() {
    
  }

  getPosts() {
    this.http.get(`${this.baseURL}posts`)
  }
}
