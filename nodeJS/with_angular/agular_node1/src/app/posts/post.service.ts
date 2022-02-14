import { Injectable } from "@angular/core";
import { Post } from "./post.model";

// to use service either
// add the service in the Provider in app.module.ts
// of use injectable in the service file
@Injectable({providedIn: 'root'})
export class PostService {
    private posts: Post[] = [];

    getPosts() {
        return [...this.posts] //copying array -> original doesn't be affected
    }

    addPost(title: string, content:string) {
        const post:Post = {
            title: title,
            content: content
        }
        this.posts.push(post)
    }
}