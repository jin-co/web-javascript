import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  // output allows the event can be listened to on the parent
  
  // @Output() postCreated = new EventEmitter()
  // @Output() postCreated = new EventEmitter<Post>() // error

  // public postsService: PostsService
  constructor(public postsService:PostService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();

    const post:Post = {
      id: "",
      title: form.value.title,
      content: form.value.content
      // title: this.enteredTitle,
      // content: this.enteredContent
    }          
    // this.postCreated.emit(post)
    this.postsService.addPost(form.value.title,
      form.value.content)
  }

}
