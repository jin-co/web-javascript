import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  inputTitle: string = '';
  inputContent: string = '';
  form!: FormGroup;
  @Output() createdPost = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onClick() {
    if (this.form.valid) {
      const post: any = {
        title: this.form.value.title,
        content: this.form.value.content,
      };
      this.createdPost.emit(post)
    }
  }
}
