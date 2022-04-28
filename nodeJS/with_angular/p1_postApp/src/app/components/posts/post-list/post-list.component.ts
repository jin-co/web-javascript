import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First', content: "1"},
  //   {title: 'second', content: "1"},
  //   {title: 'third', content: "1"},
  // ]

  // @Input() posts:any = []
  @Input() posts: Post[] = [];

  private postSubscription!: Subscription

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    // this.posts = this.postService.getPost();
    this.postService.getPost();
    this.postService.postUpdatedListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe()
  }
}
