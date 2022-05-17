import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  post!: Post;
  postUpdated = new Subject<Post[]>();
  baseURL: string = 'http://localhost:3000/';

  constructor(private route: Router, private http: HttpClient) {}

  getPosts() {
    this.http.get<Post[]>(`${this.baseURL}posts`).subscribe((data) => {
      this.posts = data;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>(`${this.baseURL}posts/${id}`);
  }

  // setPost(title: string, content: string) {
  //   const post = {
  //     _id: '',
  //     title: title,
  //     content: content,
  //   };
  //   this.http.post(`${this.baseURL}posts`, post).subscribe((data) => {
  //     this.posts.push(post);
  //     this.postUpdated.next([...this.posts]);
  //     this.route.navigate(['/']);
  //   });
  // }

  //** json cannot include file -> use FormData */
  setPost(title: string, content: string) {
    const post = {
      _id: '',
      title: title,
      content: content,
    };
    this.http.post(`${this.baseURL}posts`, post).subscribe((data) => {
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      this.route.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete(`${this.baseURL}posts/${id}`).subscribe((result) => {
      const postDeleted = this.posts.filter((p) => p._id !== id);
      this.posts = postDeleted;
      this.postUpdated.next([...this.posts]);
    });
  }

  // updatePost(id: string, title: string, content: string) {
  //   const post = {
  //     _id: id,
  //     title: title,
  //     content: content,
  //   };

  //   this.http.put(`${this.baseURL}posts/${id}`, post).subscribe((data) => {
  //     this.route.navigate(['/']);
  //   });
  // }

  updatePost(id: string, title: string, content: string) {
    const post = {
      _id: id,
      title: title,
      content: content,
    };

    this.http.put(`${this.baseURL}posts/${id}`, post).subscribe((data) => {
      this.route.navigate(['/']);
    });
  }

  updateListener() {
    return this.postUpdated.asObservable();
  }
}
