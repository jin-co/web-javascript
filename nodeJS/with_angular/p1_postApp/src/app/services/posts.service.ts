import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getPost() {
    this.http
      .get<{ message: string; posts: any }>(`${this.baseUrl}posts`)
      // .pipe((map((data) => {
      //   return data.posts.map((p: { title: any; content: any; _id: any; }) => {
      //     return {
      //       title: p.title,
      //       content: p.content,
      //       id: p._id
      //     }
      //   })
      // })))
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]);
        console.log('returned', postData)
      });
    // this.http
    //   .get<{ message: string; posts: Post[] }>(`${this.baseUrl}posts`)
    //   .subscribe((postData) => {
    //     this.posts = postData.posts;
    //     this.postUpdated.next([...this.posts]);
    //   });
    // creating copy and return
    // return [...this.posts]

    return this.posts;
  }

  postUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  setPost(title: string, content: string) {
    const post: Post = {
      _id: '',
      title: title,
      content: content,
    };
    this.http
      .post<{ message: string, postId: string }>(`${this.baseUrl}posts`, post)
      .subscribe((data) => {
        console.log(data.message);
        post._id = data.postId
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  //   setPost(title: string, content: string) {
  //     const post: Post = {
  //       id: '',
  //       title: title,
  //       content: content,
  //     };
  //     this.posts.push(post);
  //     this.postUpdated.next([...this.posts]);
  //   }

  deletePost(id: string) {
    this.http.delete(`${this.baseUrl}posts/${id}`).subscribe(() => {
      const postUpdated = this.posts.filter(p => p._id !== id)
      this.posts = postUpdated
      this.postUpdated.next(this.posts)
    })
  }
}
