import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private baseURL = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getPosts() {
    console.log('get post');
    this.http.get<Post[]>(`${this.baseURL}posts`).subscribe((data) => {
      this.posts = data;
      this.postUpdated.next([...this.posts]);
    });
  }

  setPost(title: string, content: string) {
    const post: Post = {
      _id: '',
      title: title,
      content: content,
    };
    this.http.post<Post>(`${this.baseURL}posts`, post).subscribe((data) => {
      this.posts.push(data);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(id: string) {
    console.log('delete service', id);
    this.http.delete(`${this.baseURL}posts/${id}`).subscribe((data) => {
      const deletedPost = this.posts.filter((p) => p._id !== id);
      this.posts = deletedPost;
      this.postUpdated.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post = {
      _id: id,
      title: title,
      content: content,
    };
    this.http.put(`${this.baseURL}posts/${id}`, post).subscribe((data) => {});
  }

  getPost(id: string) {}

  updateListener() {
    return this.postUpdated.asObservable();
  }
}
