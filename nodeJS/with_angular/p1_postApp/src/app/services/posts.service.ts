import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPost() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/posts'
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts])
      });
    // creating copy and return
    // return [...this.posts]

    return this.posts;
  }

  postUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  setPost(title: string, content: string) {
    const post: Post = {
      id: '',
      title: title,
      content: content,
    };
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
