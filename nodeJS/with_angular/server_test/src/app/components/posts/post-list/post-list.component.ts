import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postService.postUpdatedListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
