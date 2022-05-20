import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject();
  private baseURL = 'http://localhost:3000/'

  constructor(private http:HttpClient) {}

  getPosts() {
      this.http.get(`${this.baseURL}posts`)
  }
  getPost(id: string) {}
  addPost(title: string, content: string) {
      const post = {
          title: title,
          content: content
      }
      this.http.post(`${this.baseURL}posts`, post)
  }
  deletePost(id: string) {}
  updatePost(id: string, title: string, content: string) {}

  postUpdateListener() {
      return this.postUpdated.asObservable()
  }
}
