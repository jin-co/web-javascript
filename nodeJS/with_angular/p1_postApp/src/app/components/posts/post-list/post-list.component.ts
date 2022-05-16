import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

  /***spinner */
  isLoading = false;
  /***spinner */

  private postSubscription!: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    /***spinner */
    this.isLoading = true;
    /***spinner */

    // this.posts = this.postService.getPost();
    this.postService.getPost(this.postPerPage, this.currentPage);
    // this.postService.postUpdatedListener().subscribe((posts: Post[]) => {
    //   /***spinner */
    //   this.isLoading = false;
    //   /***spinner */

    //   this.posts = posts;
    // });

    this.postService
      .postUpdatedListener()
      .subscribe((posts: { post: Post[]; postCount: number }) => {
        /***spinner */
        this.isLoading = false;
        /***spinner */

        this.posts = posts.post;
        this.totalPage = posts.postCount
      });
  }

  ngOnDestroy(): void {
    // this.postSubscription.unsubscribe()
  }

  // onDelete(id: string) {
  //   this.postService.deletePost(id)
  // }

  onDelete(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPost(this.postPerPage, this.currentPage);
    });
  }

  //paginator
  // totalPage = 10;
  totalPage = 0;
  postPerPage = 2;
  pageSizeOptions = [1, 2, 3];
  currentPage = 1;
  onPageChange(e: PageEvent) {
    this.currentPage = e.pageIndex + 1;
    this.postPerPage = e.pageSize;
    this.postService.getPost(this.postPerPage, this.currentPage);
  }
}
