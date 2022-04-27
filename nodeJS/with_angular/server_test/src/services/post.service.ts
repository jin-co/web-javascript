import { Injectable } from "@angular/core";
import { Post } from "src/models/post";

@Injectable({providedIn: 'root'})
export class PostService {
    posts:Post[] = []

    setPost(title:String, content:String) {
        const post:Post = {
            title: title,
            content: content
        }
        this.posts.push(post)
    }

    getPost() {
        return this.posts
    }
}