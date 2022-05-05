import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(
    public postService: PostService,
    public activatedRoute: ActivatedRoute
  ) {}
  private mode = 'create';
  private postId: any = '';
  post!: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.post = this.postService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.postService.setPost(form.value.title, form.value.content);
      form.resetForm();
    } else {
      return;
    }
  }
}
