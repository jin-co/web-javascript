import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/post';
import { PostService } from 'src/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(public postService:PostService) {}

  ngOnInit(): void {}

  onClick(form: NgForm) {
    if (form.valid) {      
      this.postService.setPosts(form.value.title, form.value.content)
    } else {
      return;
    }
  }
}
