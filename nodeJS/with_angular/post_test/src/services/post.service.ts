import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "src/models/post";

@Injectable({providedIn:'root'})
export class PostService {
    posts:Post[] = []
    updatedPost = new Subject<Post[]>()

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
        this.updatedPost.next([...this.posts])
    }

    updateListener() {
        return this.updatedPost.asObservable()
    }
}