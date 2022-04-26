import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "../models/post";

@Injectable({providedIn: 'root'})
export class PostService {
    private posts: Post[] = []
    private postUpdated = new Subject<Post[]>()

    getPost() {
        return this.posts

        // creating copy and return
        return [...this.posts]
    }

    postUpdatedListener() {
        return this.postUpdated.asObservable()
    }

    setPost(title:string, content:string) {
        const post:Post = {
            title: title,
            content: content
        }
        this.posts.push(post)
        this.postUpdated.next([...this.posts])
    }
}