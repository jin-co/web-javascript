import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();
  private baseURL = 'http://localhost:3000/posts/';
  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http.get<Post[]>(this.baseURL).subscribe(result => {
      this.posts = result
      this.postUpdate.next([...this.posts])
    })
  }

  getPost(id: string) {}

  addPost(title: string, content: string) {}

  deletePost(id: string) {}

  updatePost(id: string, title: string, content: string) {}

  postUpdateListener() {
    return this.postUpdate.asObservable();
  }
}
