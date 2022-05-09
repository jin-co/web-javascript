import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Post } from "src/models/post";

@Injectable({providedIn:'root'})
export class PostService {
    posts:Post[] = []
    post!:Post
    postUpdated = new Subject<Post[]>()
    baseURL:string = 'http://localhost:3000/'

    constructor(private route:Router, private http:HttpClient) {}
    
    getPosts() {
        this.http.get<Post[]>(`${this.baseURL}posts`).subscribe(data => {
            this.posts = data
            this.postUpdated.next([...this.posts])
        })
    }

    getPost() {

    }

    setPost() {

    }

    deletePost() {

    }

    updatePost() {

    }

    updateListener() {
        return this.postUpdated.asObservable()
    }
}