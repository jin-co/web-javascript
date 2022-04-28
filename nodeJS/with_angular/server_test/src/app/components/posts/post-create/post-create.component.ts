import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  inputTitle: String = '';
  inputContent: String = '';

  constructor(public postService: PostService) {}

  ngOnInit(): void {}

  onClick() {
    this.postService.setPosts(this.inputTitle, this.inputContent);
  }
}
