import { Injectable } from "@angular/core";
import { Post } from "src/models/post";

@Injectable({providedIn:'root'})
export class PostService {

    getPosts() {

    }

    setPost(title:string, content:string) {
        const post:Post = {
            _id: '',
            title: title,
            content: content
        }
    }
}