import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

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
    this.postService.postUpdateListener().subscribe((posts) => {
      this.posts = posts;
    });
  }

  onDelete(id?: string) {
    this.postService.deletePost(id as string);
  }
}
