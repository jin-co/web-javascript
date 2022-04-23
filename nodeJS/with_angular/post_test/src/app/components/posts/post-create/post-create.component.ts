import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onClick2() {
    console.log('he')
    this.newPostTitle = this.postTitle
    this.newPostContent = this.postContent
  }
}
