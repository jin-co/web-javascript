import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts(this.pageSize, this.currentPage);
    this.postService.updateListener().subscribe((data:{posts: Post[], maxPage: number}) => {
      this.posts = data.posts;
      this.totalPage = data.maxPage
    });
  }

  // onDelete(id:string) {
  //   console.log('front coming id', id)
  //   this.postService.deletePost(id)
  // }
  //** paginator */
  onDelete(id: string) {
    this.postService.deletePost(id);
    this.postService.getPosts(this.pageSize, this.currentPage);
  }

  //** paginator */
  totalPage = 0;
  pageSize = 1;
  pageSizeOption = [1, 2, 3, 10, 20];
  currentPage = 1;

  onPageChange(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.currentPage = e.pageIndex + 1;
    this.postService.getPosts(this.pageSize, this.currentPage)
  }

  //** paginator */
}
