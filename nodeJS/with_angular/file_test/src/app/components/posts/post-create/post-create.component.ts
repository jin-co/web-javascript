import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(public postService: PostService) {}

  ngOnInit(): void {}

  onClick(form: NgForm) {
    if (form.valid) {
      this.postService.setPost(form.value.title, form.value.content);
      form.resetForm();
    }
  }
}
