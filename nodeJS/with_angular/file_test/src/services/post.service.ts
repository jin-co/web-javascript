import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, route: Router) {}

  getPosts() {
    return [...this.posts];
  }

  getPost(id: string) {}

  setPost(title: string, content: string) {
    const post:Post = {
        _id: '',
        title: title,
        content: content
    }
    this.posts.push(post)
    this.postUpdated.next([...this.posts])
  }

  updatePost(id: string, title: string, content: string) {}

  deletePost(id: string) {}

  updateListener() {
      return this.postUpdated.asObservable()
  }
}
