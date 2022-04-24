import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: 'First', content: "1"},
  //   {title: 'second', content: "1"},
  //   {title: 'third', content: "1"},
  // ]

  // @Input() posts:any = []
  @Input() posts:Post[] = []
  
  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPost()
  }

}
