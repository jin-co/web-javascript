import { Injectable } from "@angular/core";
import { Post } from "../models/post";

@Injectable({providedIn: 'root'})
export class PostService {
    private posts: Post[] = []
    getPost() {
        return this.posts

        // creating copy and return
        return [...this.posts]
    }

    setPost(title:string, content:string) {
        const post:Post = {
            title: title,
            content: content
        }
        this.posts.push(post)
    }
}