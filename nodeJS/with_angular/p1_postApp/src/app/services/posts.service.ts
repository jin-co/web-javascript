import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) {}

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
        console.log('returned', postData);
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

  setPost(title: string, content: string, image: File) {
    // const post: Post = {
    //   _id: '',
    //   title: title,
    //   content: content,
    // };

    const post = new FormData(); //allow to combine text and files (blob)

    post.append('title', title);
    post.append('content', content);
    post.append('image', image, title);

    // this.http
    //   .post<{ message: string; postId: string }>(`${this.baseUrl}posts`, post)
    //   .subscribe((data) => {
    //     console.log(data.message);
    //     post._id = data.postId;
    //     this.posts.push(post);
    //     this.postUpdated.next([...this.posts]);
    //     this.router.navigate(["/"])
    //   });

    // this.http
    //   .post<{ message: string; postId: string }>(`${this.baseUrl}posts`, post)
    //   .subscribe((data) => {
    //     const post: Post = {
    //       _id: data.postId,
    //       title: title,
    //       content: content,
    //     };
    //     this.posts.push(post);
    //     this.postUpdated.next([...this.posts]);
    //     this.router.navigate(['/']);
    //   });

    this.http
      .post<{ message: string; post: Post }>(`${this.baseUrl}posts`, post)
      .subscribe((data) => {
        const post: Post = {
          _id: data.post._id,
          title: title,
          content: content,
          imagePath: data.post.imagePath
        };
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
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
      const postUpdated = this.posts.filter((p) => p._id !== id);
      this.posts = postUpdated;
      this.postUpdated.next(this.posts);
    });
  }

  updatePost(id: string, title: string, content: string) {
    // const post: Post = {
    //   _id: id,
    //   title: title,
    //   content: content,
    // };

    const post: Post = {
      _id: id,
      title: title,
      content: content,
      imagePath: ''
    };
    console.log('post created front', post);
    console.log(`${this.baseUrl}posts/${id}`);
    this.http.put(`${this.baseUrl}posts/${id}`, post).subscribe((response) => {
      const updatedPost = [...this.posts];
      const oldPostIndex = updatedPost.findIndex((p) => p._id === post._id);
      updatedPost[oldPostIndex] = post;
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  // getAPost(id: string | null): any {
  //   return { ...this.posts.find((p) => p._id === id) };
  // }

  getAPost(id: string | null) {
    console.log(`${this.baseUrl}posts/${id}`);
    return this.http.get<{ _id: string; title: string; content: string }>(
      `${this.baseUrl}posts/${id}`
    );
  }
}
