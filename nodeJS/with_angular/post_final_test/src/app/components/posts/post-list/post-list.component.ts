import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

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
    this.postService.postUpdateListener().subscribe(result => {
      this.posts = result
    })
  }

  onDelete(id:string) {
    this.postService.deletePost(id)
  }
}
