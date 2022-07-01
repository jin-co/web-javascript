import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private baseURL = 'http://localhost:3000/posts/';
  private postUpdate = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http.get<Post[]>(this.baseURL).subscribe((posts) => {
      this.posts = posts;
      this.postUpdate.next([...this.posts]);
    });
  }

  getPost(id: string) {
    return this.http.get<{ title: string; content: string }>(this.baseURL + id);
  }

  addPost(title: string, content: string) {
    const post: Post = {
      _id: '',
      title: title,
      content: content,
    };
    this.http.post<Post>(this.baseURL, post).subscribe((result) => {
      this.posts.push(result);
      this.postUpdate.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete(this.baseURL + id).subscribe((result) => {
      const deletedPost = this.posts.filter((p) => p._id !== id);
      this.posts = deletedPost;
      this.postUpdate.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      _id: id,
      title: title,
      content: content,
    };
    this.http.put<Post>(this.baseURL + id, post).subscribe((result) => {
      this.router.navigate(['/']);
    });
  }

  postUpdateListener() {
    return this.postUpdate.asObservable();
  }
}
