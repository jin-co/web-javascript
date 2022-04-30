import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
    posts = []
  constructor(private http: HttpClient) {}
  baseURL: String = 'http://localhost:3000/';    
  postUpdated = new Subject();
  setPosts() {}

  getPosts() {
    this.http.get<{message:string, posts:any}>(`${this.baseURL}posts`).subscribe((data) => {
        this.posts = data.posts
    })
  }

  updateListener() {
      return this.postUpdated.asObservable()
  }
}
