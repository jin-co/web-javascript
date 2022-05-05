import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "src/models/post";

@Injectable({providedIn:'root'})
export class PostService {
    private posts:Post[] = []
    private postUpdated = new Subject<Post[]>()
    
    constructor(private http:HttpClient) {}

    getPosts() {
        return [...this.posts]
    }    

    setPost(title:string, content:string) {
        const post:Post = {
            _id: '',
            title: title,
            content: content
        }
        this.posts.push(post)
        this.postUpdated.next([...this.posts])
    }

    updateListener() {
        return this.postUpdated.asObservable()
    }
}