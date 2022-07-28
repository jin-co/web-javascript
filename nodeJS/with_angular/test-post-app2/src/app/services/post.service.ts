import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdate = new Subject<{posts: Post[], count:number}>();
  private baseURL = 'http://localhost:3000/posts/';
  constructor(private http: HttpClient, private router: Router) {}

  getPosts(currentPage:number, total:number) {
    const param = `?size=${total}&current=${currentPage}`
    this.http.get<{posts:Post[], count:number}>(this.baseURL + param).subscribe((data) => {
      this.posts = data.posts;      
      this.postUpdate.next({posts: [...this.posts], count: data.count});
    });
  }

  getPost(id: string) {
    return this.http.get<{title:string, content:string, imagePath:string}>(this.baseURL + id);
  }

  addPost(title: string, content: string, image?:File) {
    let post:any
    if(image) {
      post = new FormData()
      post.append('title', title)
      post.append('content', content)
      post.append('image', image, title)
    } else {
      post = {
        title: title,
        content: content,            
      };
    }    

    this.http.post(this.baseURL, post).subscribe((result) => {      
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete(this.baseURL + id).subscribe((result) => {
      this.router.navigate(['/'])
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
