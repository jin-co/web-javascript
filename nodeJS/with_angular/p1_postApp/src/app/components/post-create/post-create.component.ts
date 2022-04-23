import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost:String = ''

  title:String = ''  
  content:String = ''

  @Output() postCreated = new EventEmitter()

  
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    const post = {
      title: this.title,
      content: this.content
    }

    this.postCreated.emit(post)      
  }
}
