import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts:Post[] = []
  private postSubscription!: Subscription
  constructor(public postService:PostService) { 
    
  }

  ngOnInit(): void {
    this.postService.getPosts()
    this.postService.updateListener().subscribe(
      (posts: Post[]) => {
        this.posts = posts
      }
    )
  }

  ngOnDestroy(): void {
      // this.postSubscription.unsubscribe()
  }
  
  deletePost(id:string) {
    this.postService.deletePost(id)
  }


}
