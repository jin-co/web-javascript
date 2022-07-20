import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();
  private baseURL = 'http://localhost:3000/posts/';
  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http.get<Post[]>(this.baseURL).subscribe((result) => {
      this.posts = result;
      this.postUpdate.next([...this.posts]);
    });
  }

  getPost(id: string) {
    return this.http.get<{title:string, content:string}>(this.baseURL + id);
  }

  addPost(title: string, content: string) {
    const post: Post = {
      title: title,
      content: content,
    };

    this.http.post(this.baseURL, post).subscribe((result) => {
      this.posts.push(post);
      this.postUpdate.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete(this.baseURL + id).subscribe((result) => {
      const deletedPost = this.posts.filter((p) => p._id !== id);
      this.posts = deletedPost;
      this.postUpdate.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      _id: id,
      title: title,
      content: content,
    };

    this.http.put(this.baseURL + id, post).subscribe((result) => {
      this.router.navigate(['/'])
    });
  }

  postUpdateListener() {
    return this.postUpdate.asObservable();
  }
}
