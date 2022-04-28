import { Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({providedIn: 'root'})
export class PostService {
  posts: Post[] = [];

  getPosts() {
    return this.posts;
  }

  setPosts(title:String, content:String) {
      const post = {
          id: '',
          title: title,
          content: content
      }
      this.posts.push(post)
  }
}
