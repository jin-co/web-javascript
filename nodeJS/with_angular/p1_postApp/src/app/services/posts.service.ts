import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

// use global variables for the URL
const GLOBAL_VARIABLE = 'URL'

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{ post: Post[]; postCount: number }>();
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) {}

  // getPost() {
  //   this.http
  //     .get<{ message: string; posts: any }>(`${this.baseUrl}posts`)
  //     // .pipe((map((data) => {
  //     //   return data.posts.map((p: { title: any; content: any; _id: any; }) => {
  //     //     return {
  //     //       title: p.title,
  //     //       content: p.content,
  //     //       id: p._id
  //     //     }
  //     //   })
  //     // })))
  //     .subscribe((postData) => {
  //       this.posts = postData.posts;
  //       this.postUpdated.next([...this.posts]);
  //       console.log('returned', postData);
  //     });
  //   // this.http
  //   //   .get<{ message: string; posts: Post[] }>(`${this.baseUrl}posts`)
  //   //   .subscribe((postData) => {
  //   //     this.posts = postData.posts;
  //   //     this.postUpdated.next([...this.posts]);
  //   //   });
  //   // creating copy and return
  //   // return [...this.posts]

  //   return this.posts;
  // }

  getPost(postPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; postCount: number }>(
        `${this.baseUrl}posts${queryParams}`
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdated.next({
          post: [...this.posts],
          postCount: postData.postCount,
        });
        console.log('returned', postData);
        console.log('returned', this.posts);
      });
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
        // const post: Post = {
        //   _id: data.post._id,
        //   title: title,
        //   content: content,
        //   imagePath: data.post.imagePath,
        // };
        // this.posts.push(post);
        // this.postUpdated.next([...this.posts]);
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

  // deletePost(id: string) {
  //   this.http.delete(`${this.baseUrl}posts/${id}`).subscribe(() => {
  //     // const postUpdated = this.posts.filter((p) => p._id !== id);
  //     // this.posts = postUpdated;
  //     // this.postUpdated.next(this.posts);
  //     this.router.navigate(['/']);
  //   });
  // }

  deletePost(id: string) {
    return this.http.delete(`${this.baseUrl}posts/${id}`);
  }

  // updatePost(id: string, title: string, content: string) {
  //   // const post: Post = {
  //   //   _id: id,
  //   //   title: title,
  //   //   content: content,
  //   // };

  //   const post: Post = {
  //     _id: id,
  //     title: title,
  //     content: content,
  //   };
  //   console.log('post created front', post);
  //   console.log(`${this.baseUrl}posts/${id}`);
  //   this.http.put(`${this.baseUrl}posts/${id}`, post).subscribe((response) => {
  //     const updatedPost = [...this.posts];
  //     const oldPostIndex = updatedPost.findIndex((p) => p._id === post._id);
  //     updatedPost[oldPostIndex] = post;
  //     this.posts = updatedPost;
  //     this.postUpdated.next([...this.posts]);
  //     this.router.navigate(['/']);
  //   });
  // }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: FormData | Post;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('_id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        _id: id,
        title: title,
        content: content,
        imagePath: image,
        auth: ''
      };
    }
    this.http
      .put(`${this.baseUrl}posts/${id}`, postData)
      .subscribe((response) => {
        // const updatedPost = [...this.posts];
        // const oldPostIndex = updatedPost.findIndex((p) => p._id === p._id);

        // const post: Post = {
        //   _id: id,
        //   title: title,
        //   content: content,
        //   imagePath: '',
        // };

        // updatedPost[oldPostIndex] = post;
        // this.posts = updatedPost;
        // this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  // getAPost(id: string | null): any {
  //   return { ...this.posts.find((p) => p._id === id) };
  // }

  // getAPost(id: string | null) {
  //   console.log(`${this.baseUrl}posts/${id}`);
  //   return this.http.get<{ _id: string; title: string; content: string }>(
  //     `${this.baseUrl}posts/${id}`
  //   );
  // }

  getAPost(id: string | null) {
    console.log(`${this.baseUrl}posts/${id}`);
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      author: string
    }>(`${this.baseUrl}posts/${id}`);
  }
}
