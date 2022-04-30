import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any = [];

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postService.updateListener().subscribe((posts: any) => {
      this.posts = posts;
    });
  }
}
