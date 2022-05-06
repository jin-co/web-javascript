import { Injectable } from '@angular/core';
import { Router } from 'express';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  postUpdated = new Subject<Post[]>();

  constructor(public router: Router) {}

  getPosts() {
    return this.posts;
  }

  setPost(title: string, content: string) {}

  getPost(id: string) {}

  updatePost(id: string, title: string, content: string) {}

  deletePost(id: string) {}

  updateListener() {
    return this.postUpdated.asObservable();
  }
}
