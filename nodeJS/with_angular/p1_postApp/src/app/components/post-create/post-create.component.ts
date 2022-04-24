import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost:String = ''

  title:String = ''  
  content:String = ''

  @Output() postCreated = new EventEmitter<Post>()

  
  constructor() { }

  ngOnInit(): void {
  }
  // using two way validate
  // onClick() {
  //   const post:Post = {
  //     title: this.title.toString(),
  //     content: this.content.toString()
  //   }

  //   this.postCreated.emit(post)      
  // }

  // using form
  onSubmit(postForm:NgForm) {
    if(postForm.valid) {
      const post:Post = {
        title: postForm.value.title,
        content: postForm.value.content
      }
      this.postCreated.emit(post)
    } else {
      return
    } 
  }
}
