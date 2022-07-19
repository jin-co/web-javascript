import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  form!: FormGroup;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: Validators.required }),
      content: new FormControl(null, { validators: Validators.required }),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.postService.addPost(this.form.value.title, this.form.value.content);
    }
    this.form.reset();
  }
}
