import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "src/models/post";

@Injectable({providedIn:'root'})
export class PostService {    
    posts:Post[] = []
    post!:Post
    postUpdated = new Subject<Post[]>()
    private baseURL = 'http://localhost:3000/'

    constructor(private http:HttpClient) {}

    getPosts() {
        this.http.get<Post[]>(`${this.baseURL}posts`).subscribe(result => {
            this.posts = result
            this.postUpdated.next([...this.posts])
        })
    }
    getPost(id:string) {
        this.http.get<Post>(`${this.baseURL}posts/${id}`).subscribe(data => {
            this.post = data
            return this.post    
        })
    }

    setPosts(title:string, content:string) {
        const post = {
            _id: '',
            title: title,
            content: content
        }
        this.http.post(`${this.baseURL}posts`, post).subscribe((data) => {
            this.posts.push(post)
            this.postUpdated.next([...this.posts])
        })
    }

    updatePost(id:string, title:string, content:string) {}

    deletePost(id:string) {
        this.http.delete(`${this.baseURL}posts/${id}`).subscribe(result => {
            this.posts.filter(p => p._id !== id)
            this.postUpdated.next([...this.posts])
        })
    }

    updateListener() {
        return this.postUpdated.asObservable()
    }
}