import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PostService } from 'src/app/services/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts(this.pageSize, this.currentPage);
    this.postService.postUpdateListener().subscribe((data) => {
      this.posts = data.posts;
      this.length = data.count
    });
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }

  pageSize: number = 10;
  pageSizeOptions = [1, 2, 3, 5, 10];
  currentPage: number = 1;
  length:number = 5

  onPageChange(e: PageEvent) {
    this.currentPage = e.pageIndex + 1;
    this.pageSize = e.pageSize
    this.postService.getPosts(this.pageSize, this.currentPage);
  }
}
