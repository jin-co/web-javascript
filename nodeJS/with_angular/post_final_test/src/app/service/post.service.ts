import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private baseURL = 'http://localhost:3000/posts/';
  
  constructor(private http: HttpClient, router: Router) {}

  getPosts() {
    this.http.get<Post[]>(`${this.baseURL}`).subscribe((result) => {        
      this.posts = result;
      this.postUpdated.next([...this.posts]);
    });
  }
  getPost(id: string) {}

  setPost(title: string, content: string) {
    const post:Post = {
      _id: '',
      title: title,
      content: content
    }
    this.http.post(`${this.baseURL}`, post).subscribe(result => {
      this.posts.push(post)
      this.postUpdated.next([...this.posts])
    })
  }  

  deletePost(id: string) {
    this.http.delete(`${this.baseURL}${id}`).subscribe(result => {
      const deletedPost = this.posts.filter(p => p._id !== id)
      this.posts = deletedPost
      this.postUpdated.next([...this.posts])
    })
  }

  updatePost(id: string, title: string, content: string) {}

  postUpdateListener() {
    return this.postUpdated.asObservable();
  }
}
