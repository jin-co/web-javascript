import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  inputTitle: string = '';
  inputContent: string = '';
  form!: FormGroup;  

  constructor(private postService:PostService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onClick() {
    if (this.form.valid) {      
      this.postService.setPost(
        this.form.value.title,
        this.form.value.content,
      )
    }
    this.form.reset()
  }
}
