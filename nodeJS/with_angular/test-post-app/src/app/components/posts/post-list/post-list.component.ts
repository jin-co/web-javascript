import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/services/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts:any = []
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
    this.postService.postUpdatedListener().subscribe(posts => {
      this.posts = posts
    })
  }

}
