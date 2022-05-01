import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  inputTitle = ''
  inputContent = ''
  outputTitle = ''
  outputContent = ''

  @Output() postCreated = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  
  onClick(form:NgForm) {
    if(form.valid) {
      const post = {
        title: form.value.title,
        content: form.value.content
      }            
      this.postCreated.emit(post)
    } else {
      return
    }
  }
}
