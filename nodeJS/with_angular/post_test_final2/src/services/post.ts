import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  postUpdated = new Subject<Post[]>();
  baseURL: string = 'http://localhost:3000/posts/';
  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<Post[]>(this.baseURL).subscribe((posts) => {
      this.posts = posts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPost(id: string) {}

  setPost(title: string, content: string) {
    const post: Post = {
      _id: '',
      title: title,
      content: content,
    };
    this.http.put(this.baseURL, post).subscribe((result) => {
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, content: string) {}

  deletePost(id: string) {}

  postUpdatedListener() {
    return this.postUpdated.asObservable();
  }
}
