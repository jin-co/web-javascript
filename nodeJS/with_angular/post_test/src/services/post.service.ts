import { Post } from "src/models/post";

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