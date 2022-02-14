import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./post.model";

// to use service either
// add the service in the Provider in app.module.ts
// of use injectable in the service file
@Injectable({providedIn: 'root'})
export class PostService {
    private posts: Post[] = [];

    private postUpdated = new Subject<Post[]>()

    constructor(private http: HttpClient) {

    }

    getPosts() {
        // return [...this.posts] //copying array -> original doesn't be affected

        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
        .subscribe((data) => {
            this.posts = data.posts;
            this.postUpdated.next([...this.posts])
        });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable()
    }

    addPost(title: string, content:string) {
        const post:Post = {
            id: "",
            title: title,
            content: content
        }
        this.http.post('http://localhost:3000/api/posts', post)
        .subscribe((data) => {
            console.log(data)
            this.posts.push(post)
            this.postUpdated.next([...this.posts])
        })
    }
}