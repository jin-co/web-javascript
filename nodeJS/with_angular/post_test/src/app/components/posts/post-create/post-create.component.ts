import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postTitle = ''
  postContent = ''
  newPostTitle = ''
  newPostContent = ''

  @Output() createdPost = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick2() {
    console.log('he')
    this.newPostTitle = this.postTitle
    this.newPostContent = this.postContent

    const post:any = {
      title: this.postTitle,
      content: this.postContent
    }

    this.createdPost.emit(post)
  }
}
