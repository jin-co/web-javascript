import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private baseURL = 'http://localhost:3000/posts/';
  
  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http.get<Post[]>(`${this.baseURL}`).subscribe((result) => {        
      this.posts = result;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPost(id: string) {
    return this.http.get<{id:string, title:string, content:string, imagePath:string}>(`${this.baseURL}${id}`)
  }

  setPost(title: string, content: string, image:File) {
    const postData = new FormData()
    postData.append("title", title)
    postData.append("content", content)
    postData.append("image", image, title)
    
    this.http.post<Post>(`${this.baseURL}`, postData).subscribe(result => {
      const post:Post = {
        _id: '',
        title: title,
        content: content,
        imagePath: result.imagePath
      }
      this.posts.push(post)
      this.postUpdated.next([...this.posts])
      this.router.navigate(['/'])
    })
  }  

  deletePost(id: string) {
    this.http.delete(`${this.baseURL}${id}`).subscribe(result => {
      const deletedPost = this.posts.filter(p => p._id !== id)
      this.posts = deletedPost
      this.postUpdated.next([...this.posts])
    })
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
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
      }
    }
     
    this.http.put(`${this.baseURL}${id}`, post).subscribe(result => {
      
    })
  }

  postUpdateListener() {
    return this.postUpdated.asObservable();
  }
}
