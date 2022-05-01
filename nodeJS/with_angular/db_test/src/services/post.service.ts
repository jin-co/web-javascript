import { Injectable } from '@angular/core';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
    posts:Post[] = []

    getPost() {
        return this.posts
    }

    setPost(title:string, content:string) {
        const post:Post = {
            id: '',
            title: title,
            content: content
        }
        this.posts.push(post)
    }
}
