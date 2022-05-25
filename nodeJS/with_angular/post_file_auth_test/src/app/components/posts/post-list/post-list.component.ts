import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isAuthenticated: boolean = false;
  private authSubs!: Subscription;
  private userSubs!: Subscription;
  userId!:string

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.userId = this.userService.getUserId()
    this.isAuthenticated = this.userService.getIsLogged();
    this.authSubs = this.postService.postUpdateListener().subscribe((post) => {
      this.posts = post;
    });
    this.userSubs = this.userService
      .userUpdateListener()
      .subscribe((result) => {
        this.isAuthenticated = result;
        this.userId = this.userService.getUserId()
      });
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }
}
