import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})


export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  // posts: Post[] = [];

  private postsSub!: Subscription;

  // Input allows getting the event from the parent
  // @Input() posts:Post[] = []
  posts:Post[] = []

  // by adding 'public' typescript automatically creates a property 
  constructor(public postsService: PostService) {}

  ngOnInit() {
    // this.posts = this.postsService.getPosts();
    this.postsService.getPosts();

    // observable
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
