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

  getPost(id: string) {
    return this.http.get<{ title: string; content: string; imagePath: string }>(
      this.baseURL + id
    );
  }

  addPost(title: string, content: string, image: File) {
    const post = new FormData();
    post.append('title', title);
    post.append('content', content);
    post.append('image', image, title);
    console.log('image post servie test: ');
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

  updatePost(id: string, title: string, content: string, image: string | File) {
    let post;
    if (typeof image === 'object') {
      post = new FormData();
      post.append('_id', id);
      post.append('title', title);
      post.append('content', content);
      post.append('image', image, title);
    } else {
      post = {
        _id: id,
        title: title,
        content: content,
        imagePathe: image,
      };
    }

    this.http.put(this.baseURL + id, post).subscribe((result) => {
      this.router.navigate(['/']);
    });
  }

  postUpdatedListener() {
    return this.postUpdated.asObservable();
  }
}
