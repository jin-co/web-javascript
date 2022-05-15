import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  postUpdate = new Subject();

  constructor(private http: HttpClient, route: Router) {}

  getPosts() {
    return [...this.posts];
  }

  getPost(id: string) {}

  setPost(title: string, content: string) {
      
  }

  updatePost(id: string, title: string, content: string) {}

  deletePost(id: string) {}
}
