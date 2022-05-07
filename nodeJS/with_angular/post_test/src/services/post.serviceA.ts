import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "src/models/post";

@Injectable({providedIn:'root'})
export class PostService {    
    posts:Post[] = []
    postUpdated = new Subject<Post[]>()
    private baseURL = 'http://localhost:3000/'

    constructor(private http:HttpClient) {}

    getPosts() {
        this.http.get<Post>(`${this.baseURL}posts`).subscribe(result => {
            this.posts.push(result)
            this.postUpdated.next([...this.posts])
        })
    }
    getPost(id:string) {}
    setPosts(title:string, content:string) {}
    updatePost(id:string, title:string, content:string) {}
    deletePost(id:string) {}

    updateListener() {
        return this.postUpdated.asObservable()
    }
}