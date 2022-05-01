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
      .pipe(map(data) => {
        return data.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id:post._id
          }
        })
      })
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]);
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
      id: '',
      title: title,
      content: content,
    };    
    this.http
      .post<{ message: string }>(`${this.baseUrl}posts`, post)
      .subscribe((data) => {
        console.log(data.message);
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
}
