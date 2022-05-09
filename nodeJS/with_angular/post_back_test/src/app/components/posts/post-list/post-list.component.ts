import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts:Post[] = []
  constructor(public postService:PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
    this.postService.updateListener().subscribe((data) => {
      this.posts = data
    })
  }
}
