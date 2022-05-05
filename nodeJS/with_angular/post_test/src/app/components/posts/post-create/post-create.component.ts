import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  inputTitle = '';
  inputContent = '';
  outputTitle = '';
  outputContent = '';

  @Output() createdPost = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    const post = {
      title: this.inputTitle,
      content: this.inputContent
    }

    this.createdPost.emit(post)
  }
}
