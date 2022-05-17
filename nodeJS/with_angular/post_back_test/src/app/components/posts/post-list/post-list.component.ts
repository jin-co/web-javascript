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
    this.postService.getPosts();
    this.postService.updateListener().subscribe((data) => {
      this.posts = data;
    });
  }

  // onDelete(id:string) {
  //   console.log('front coming id', id)
  //   this.postService.deletePost(id)
  // }
  //** paginator */
  onDelete(id: string) {
    console.log('front coming id', id);
    this.postService.deletePost(id);
  }

  // totalPage = 10

  //** paginator */
}
