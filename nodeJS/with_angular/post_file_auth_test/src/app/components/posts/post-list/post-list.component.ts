import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts:Post[] = []
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts()
    console.log('front array', this.posts)
    this.postService.postUpdateListener().subscribe(post => {
      this.posts = post
    })
  }

  onDelete(id: string) {
    this.postService.deletePost(id)
  }
}
