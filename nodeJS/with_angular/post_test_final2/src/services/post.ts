import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private baseURL: string = 'http://localhost:3000/posts/';
  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    console.log('get post');
    this.http.get<Post[]>(this.baseURL).subscribe((posts) => {
      this.posts = posts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPost(id: string) {
    console.log(
      this.http
        .get<{ id: string; title: string; content: string; imagePath: string }>(
          this.baseURL + `/${id}`
        )
        .subscribe((result) => console.log(result))
    );
    return this.http.get<{ id: string; title: string; content: string }>(
      this.baseURL + `/${id}`
    );
  }

  setPost(title: string, content: string, image:File) {
    //test
    console.log('calling post');
    const post = new FormData()
    post.append("title", title)
    post.append("content", content)
    post.append("image", image, title)
    
    this.http.post(this.baseURL, post).subscribe((result) => {
      this.router.navigate(['/'])
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      _id: id,
      title: title,
      content: content,
      imagePath: ''
    };
    this.http.put(this.baseURL + `/${id}`, post).subscribe((result) => {
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete(this.baseURL + `/${id}`).subscribe((result) => {
      const deletedPosts = this.posts.filter((p) => p._id !== id);
      this.posts = deletedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  postUpdatedListener() {
    return this.postUpdated.asObservable();
  }
}
