import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  updatedPost = new Subject<Post[]>();
  baseURL = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<Post[]>(`${this.baseURL}posts`).subscribe((data) => {
      this.posts = data;
      this.updatedPost.next([...this.posts]);
    });
    return this.posts;
  }

  setPost(title: string, content: string) {
    const post: Post = {
      _id: '',
      title: title,
      content: content,
    };    

    this.http.post(`${this.baseURL}/posts`, post).subscribe((data) => {
        this.updatedPost.next([...this.posts])
    })

  }

  updateListener() {
    return this.updatedPost.asObservable();
  }
}
