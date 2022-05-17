import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts:Post[] = []
  constructor(public postService:PostService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.postPerPage, this.currentPage)
    this.postService.updateListener().subscribe((data: {postCount: number,posts:Post[]}) => {
      this.posts = data.posts
      this.totalPage = data.postCount
    })
  }

  // onDelete(id:string) {
  //   console.log('front coming id', id)
  //   this.postService.deletePost(id)
  // }
  //** paginator */  
  onDelete(id:string) {    
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage)
    })
  }
  
  // totalPage = 10
  totalPage = 0
  postPerPage = 5
  pageSize = [1, 2, 3]
  currentPage = 1
  onPageChanged(e:PageEvent) {
    this.currentPage = e.pageIndex + 1
    this.postPerPage = e.pageSize
    this.postService.getPosts(this.postPerPage, this.currentPage)

  }
  //** paginator */  
}
