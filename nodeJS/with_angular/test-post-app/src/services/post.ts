import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private baseURL = 'http://localhost:3000/posts/';

  constructor(private router: Router, private http: HttpClient) {}

  getPosts() {
    this.http.get<Post[]>(this.baseURL).subscribe((posts) => {
      this.posts = posts;
      this.postUpdated.next([...posts]);
    });
  }

  getPost(id: string) {}

  addPost(title: string, content: string) {
    const post: Post = {
      _id: '',
      title: title,
      content: content,
    };
    this.http.post<Post>(this.baseURL, post).subscribe((post) => {
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete(this.baseURL + id).subscribe((result) => {
      const deletedPost = this.posts.filter((p) => p._id !== id);
      this.posts = deletedPost;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string) {}

  postUpdatedListener() {
    return this.postUpdated.asObservable();
  }
}
