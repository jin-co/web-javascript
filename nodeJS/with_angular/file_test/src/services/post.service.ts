import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts: Post[] = [];
  postUpdated = new Subject<Post[]>();
  baseURL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient, private route: Router) {}

  getPosts() {
    this.http.get<Post[]>(`${this.baseURL}posts`).subscribe((data) => {
      this.posts = data;
      this.postUpdated.next(this.posts);
      this.route.navigate(['/'])
    });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      image: string;
    }>(`${this.baseURL}posts/${id}`);
  }

  setPost(title: string, content: string, image: File) {
    const postData = new FormData()
    postData.append("title", title)
    postData.append("content", content)
    postData.append("image", image, title)
    // const post: Post = {
    //   _id: '',
    //   title: title,
    //   content: content,
    //   imagePath: ''
    // };
    this.http.post<Post>(`${this.baseURL}posts`, postData).subscribe((data) => {
      this.posts.push(data);
      this.postUpdated.next([...this.posts]);
      this.route.navigate(['/'])
    });
  }

  updatePost(id: string, title: string, content: string) {
      const post:Post = {
          _id: id,
          title: title,
          content: content,
          imagePath: ''
      }
      this.http.put(`${this.baseURL}posts/${id}`, post).subscribe(data => {          
          this.route.navigate(['/'])
      })
  }

  deletePost(id: string) {
    this.http.delete<Post>(`${this.baseURL}posts/${id}`).subscribe((data) => {
      const deletedPost = this.posts.filter((p) => p._id !== id);
      console.log(data, 'id', id);
      this.posts = deletedPost;
      this.postUpdated.next([...this.posts]);
    });
  }

  updateListener() {
    return this.postUpdated.asObservable();
  }
}
