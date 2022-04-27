import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  inputTitle:String = ''
  inputContent:String = ''
  outputTitle:String = ''
  outputContent:String = ''

  @Output() postCreated = new EventEmitter<Post>()

  constructor() { }

  ngOnInit(): void {
  }
  
  onClick() {
    const post:Post = {
      title: this.inputTitle,
      content: this.inputContent
    }    
    this.postCreated.emit(post)    
  }
}
