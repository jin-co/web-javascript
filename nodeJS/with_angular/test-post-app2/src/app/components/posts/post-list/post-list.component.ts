import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
    this.postService.getPosts(this.currentPage, this.pageSize);
    this.postService.postUpdateListener().subscribe((data) => {
      console.log(data);
      this.posts = data.posts;
      this.length = data.count
    });
  }

  onDelete(id?: string) {
    this.postService.deletePost(id as string);
  }

  pageSize: number = 10;
  pageSizeOptions: number[] = [1, 2, 3, 10];
  length: number = 20;
  currentPage: number = 1;
  onPageChange(e: PageEvent) {    
    this.currentPage = e.pageIndex + 1
    this.pageSize = e.pageSize
    this.postService.getPosts(this.currentPage, this.pageSize)
  }
}
