import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postService.postUpdatedListener().subscribe((posts) => {
      this.posts = posts;
    });
  }

  onEdit() {

  }

  onDelete(id:string) {
    this.postService.deletePost(id)
  }
}
