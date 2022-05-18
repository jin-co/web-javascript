import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  post!: Post;
  // postUpdated = new Subject<Post[]>();

  //** paginator */
  postUpdated = new Subject<Post[]>();
  //** paginator */
  baseURL: string = 'http://localhost:3000/';

  constructor(private route: Router, private http: HttpClient) {}

  // getPosts() {
  //   this.http.get<Post[]>(`${this.baseURL}posts`).subscribe((data) => {
  //     this.posts = data;
  //     this.postUpdated.next([...this.posts]);
  //   });
  // }
  //** paginator */
  getPosts() {
    this.http.get<Post[]>(`${this.baseURL}posts`).subscribe((data) => {
      this.posts = data;
      this.postUpdated.next([...this.posts]);
    });
  }
  //** paginator */  

  // getPost(id: string) {
  //   return this.http.get<{
  //     _id: string;
  //     title: string;
  //     content: string;      
  //   }>(`${this.baseURL}posts/${id}`);
  // }
  //** image upload */
  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;    
      imagePath: string  
    }>(`${this.baseURL}posts/${id}`);
  }
//** image upload */

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

  //** image upload json cannot include file -> use FormData */
  setPost(title: string, content: string, image: File) {
    const postData = new FormData()
    postData.append("title", title)
    postData.append("content", content)
    postData.append("image", image, title)    
    this.http.post(`${this.baseURL}posts`, postData).subscribe((data) => {
      const post = {
        _id: '',
        title: title,
        content: content,
        imagePath: ''
      };
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      this.route.navigate(['/']);
    });
  }
  //** image upload */

  // deletePost(id: string) {
  //   this.http.delete(`${this.baseURL}posts/${id}`).subscribe((result) => {
  //     const postDeleted = this.posts.filter((p) => p._id !== id);
  //     this.posts = postDeleted;
  //     this.postUpdated.next([...this.posts]);
  //   });
  // }

  //** paginator */
  deletePost(id: string) {
    this.http.delete(`${this.baseURL}posts/${id}`).subscribe((result) => {
      const postDeleted = this.posts.filter((p) => p._id !== id);
      this.posts = postDeleted;
      this.postUpdated.next([...this.posts]);
    });
  }
  //** paginator */

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

  //** image upload */
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
      };
    }     

    this.http.put(`${this.baseURL}posts/${id}`, post).subscribe((data) => {
      this.route.navigate(['/']);
    });
  }
  //** image upload */

  updateListener() {
    return this.postUpdated.asObservable();
  }
}
