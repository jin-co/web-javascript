import { Post } from '../models/post';

export class PostService {
  private posts: Post[] = [];

  setPost(title:string, content:string) {
      const post:Post = {
        title: title,
        content: content
      }
    this.posts.push(post)
  }

  getPost() {
    return this.posts;
  }
}
