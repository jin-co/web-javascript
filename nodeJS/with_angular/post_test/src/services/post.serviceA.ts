import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "src/models/post";

@Injectable({providedIn:'root'})
export class PostService {
    
    posts:Post[] = []
    postUpdated = new Subject()

    getPosts() {}
    getPost(id:string) {}
    setPosts(title:string, content:string) {}
    updatePost(id:string, title:string, content:string) {}
    deletePost(id:string) {}

    updateListener() {
        return this.postUpdated.asObservable()
    }
}