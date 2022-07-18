import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {  
  @Output() createdPost = new EventEmitter();
  form!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: Validators.required }),
      content: new FormControl(null, { validators: Validators.required }),
    });
  }

  onSubmit() {
    if(this.form.valid) {
      const post:Post = {
        title: this.form.value.title,
        content: this.form.value.content,
      }
      this.createdPost.emit(post)
    }
    this.form.reset()
  }
}
