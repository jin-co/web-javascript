import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts:any = [];
  constructor(private http: HttpClient) {}
  baseURL: String = 'http://localhost:3000/';
  postUpdated = new Subject();
  setPosts(title:String, content:String) {
    const post: Post = {
      id: '1',
      title: title,
      content: content,
    };
    this.posts.push(post)
  }

  getPosts() {
    this.http
      .get<{ message: string; posts: any[] }>(`${this.baseURL}posts`)
      .subscribe((data) => { 
        this.posts = data.posts;
        this.postUpdated.next(this.posts)
      });
  }

  updateListener() {
    return this.postUpdated.asObservable();
  }
}
