import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private baseURL = 'http://localhost:3000/posts/';
  private postUpdate = new Subject<{ posts: Post[]; count: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(pageSize: number, currentPage: number) {
    const param = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    this.http
      .get<{ posts: Post[]; count: number }>(this.baseURL + param)
      .subscribe((data) => {
        this.posts = data.posts;
        this.postUpdate.next({ posts: [...this.posts], count: data.count });
      });
  }

  getPost(id: string) {
    return this.http.get<{ title: string; content: string; imagePath: string }>(
      this.baseURL + id
    );
  }

  addPost(title: string, content: string, image:File) {
    const post = new FormData()
    post.append("title", title)
    post.append("content", content)
    post.append("image", image, title)    
    this.http.post<Post>(this.baseURL, post).subscribe((result) => {
      // this.posts.push(result);
      // this.postUpdate.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete(this.baseURL + id).subscribe((result) => {
      // const deletedPost = this.posts.filter((p) => p._id !== id);
      // this.posts = deletedPost;
      // this.postUpdate.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string, image:File | string) {
    let post
    if(typeof(image) === 'object') {
      post = new FormData()
      post.append("_id", id)
      post.append("title", title)
      post.append("content", content)
      post.append("image", image, title) 
    } else {
      post = {
        _id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }    
    this.http.put<Post>(this.baseURL + id, post).subscribe((result) => {
      this.router.navigate(['/']);
    });
  }

  postUpdateListener() {
    return this.postUpdate.asObservable();
  }
}
