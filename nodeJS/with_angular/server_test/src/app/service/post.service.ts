import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<Post[]>(`${this.baseURL}posts`).subscribe((data) => {
      this.posts = data;
      this.postUpdated.next(this.posts);
    });
    return this.posts;
  }

  setPosts(title: String, content: String) {
    const post = {
      id: '',
      title: title,
      content: content,
    };
    this.posts.push(post);
  }

  postUpdatedListener() {
    return this.postUpdated.asObservable()
  }
}
