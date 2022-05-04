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

    this.http.post<string>(`${this.baseURL}posts`, post).subscribe((data) => {
        this.posts.push(post)
        this.updatedPost.next(this.posts)
        console.log(data)
    })
  }

  deletePost(id:string) {
      this.http.delete(`${this.baseURL}posts/${id}`).subscribe(() => {
        const posts = this.posts.filter(p => p._id !== id)
        this.updatedPost.next(posts)
      })
  }

  updateListener() {
    return this.updatedPost.asObservable();
  }
}
