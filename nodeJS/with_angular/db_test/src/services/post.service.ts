import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
    private posts:Post[] = []
    private postUpdated = new Subject<Post[]>()
    private baseURL = 'http://localhost:3000/'

    constructor(private http:HttpClient) {}

    getPost() {
        this.http.get<Post[]>(`${this.baseURL}posts`).subscribe((data) => {
            this.posts = data
            this.postUpdated.next(this.posts)
        })
        return this.posts
    }

    setPost(title:string, content:string) {
        const post:Post = {
            id: '',
            title: title,
            content: content
        }
        this.http.post<{message:string}>(`${this.baseURL}posts`, post).subscribe((data) => {
            this.posts.push(post)
            this.postUpdated.next(this.posts)
        })
    }

    updateListener() {
        return this.postUpdated.asObservable()
    }
}
