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
  private baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http.get<Post[]>(`${this.baseURL}posts`).subscribe((result) => {
      this.posts = result;
      this.postUpdated.next([...this.posts]);
    });
  }
  getPost(id: string) {
    return this.http
      .get<{_id:string, title:string, content:string}>(`${this.baseURL}posts/${id}`)      
  }

  setPosts(title: string, content: string) {
    const post = {
      _id: '',
      title: title,
      content: content,
    };
    this.http.post<Post>(`${this.baseURL}posts`, post).subscribe((data) => {
      this.posts.push(data);
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post = {
      _id: id,
      title: title,
      content: content,
    };

    this.http.put(`${this.baseURL}posts/${id}`, post).subscribe((result) => {        
        this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete<Post>(`${this.baseURL}posts/${id}`).subscribe((result) => {
      const deletedPost = this.posts.filter((p) => p._id !== id);
      this.posts = deletedPost;
      this.postUpdated.next(this.posts);
      this.router.navigate(['/']);
    });
  }

  updateListener() {
    return this.postUpdated.asObservable();
  }
}
