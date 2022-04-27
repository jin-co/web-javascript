import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "src/models/post";

@Injectable({providedIn: 'root'})
export class PostService {
    private posts:Post[] = []
    private postUpdated = new Subject<Post[]>()

    setPost(title:String, content:String) {
        const post:Post = {
            title: title,
            content: content
        }
        this.posts.push(post)
        this.postUpdated.next([...this.posts])
    }

    postUpdatedListener() {
        return this.postUpdated.asObservable()
    }

    getPost() {
        return [...this.posts]
        // return this.posts
    }
}