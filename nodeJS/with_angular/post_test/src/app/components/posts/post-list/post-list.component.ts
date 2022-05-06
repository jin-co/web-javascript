import { Component, Input, OnInit } from '@angular/core';
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
    this.postService.getPosts()
    this.postService.updateListener().subscribe((data) => {
      this.posts = data
    })
  }

  onDeleteClick(id:string) {
    console.log('delete clicked')
    this.postService.deletePost(id)
  }

  onUpdateClicked(i:Post) {
    this.postService.updatePost(
      i._id,
      i.title,
      i.content
    )
  }
}
