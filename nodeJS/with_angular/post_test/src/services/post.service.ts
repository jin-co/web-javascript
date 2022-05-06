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
      console.log('service add clicked')
    const post: Post = {
      _id: '',
      title: title,
      content: content,
    };
    this.http.post<string>(`${this.baseURL}posts`, post).subscribe((data) => {
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(id: string) {
      console.log('delete service', id)
      this.http.delete(`${this.baseURL}posts/${id}`).subscribe((data) => {
          this.posts.filter(p => p._id !== id)
          this.postUpdated.next([...this.posts])
      })
  }

  updatePost(id: string) {}

  getPost(id: string) {}

  
  updateListener() {
    return this.postUpdated.asObservable();
  }
}
