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
  isAuthenticated:boolean = false
  private authSubs!: Subscription

  constructor(private postService:PostService) { }
  
  ngOnInit(): void {
    this.posts = this.postService.getPosts()
    console.log('front array', this.posts)

    this.postService.postUpdateListener().subscribe(post => {
      this.posts = post
    })


    
  }
  
  ngOnDestroy(): void {
    this.authSubs.unsubscribe()
  }

  onDelete(id: string) {
    this.postService.deletePost(id)
  }

  
}
