import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  @Output() postCreated = new EventEmitter()
  // output allows the event can be listened to on the parent

  // public postsService: PostsService
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onAddPost(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
    // this.postsService.addPost(form.value.title, form.value.content);
    // form.resetForm();

    const post = {
      title: this.enteredTitle,
      continue: this.enteredContent
    }

    this.postCreated.emit(post)
  }

}
