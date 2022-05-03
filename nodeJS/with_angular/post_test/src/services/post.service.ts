import { Injectable } from "@angular/core";
import { Post } from "src/models/post";

@Injectable({providedIn:'root'})
export class PostService {
    posts:Post[] = []

    getPosts() {
        return this.posts
    }

    setPost(title:string, content:string) {
        const post:Post = {
            _id: '',
            title: title,
            content: content
        }

        this.posts.push(post)
    }
}