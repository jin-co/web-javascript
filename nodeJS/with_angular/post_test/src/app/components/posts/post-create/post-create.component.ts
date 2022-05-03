import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {  

  @Output() postCreated = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit(form:NgForm) {
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
