import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  inputTitle: string = '';
  inputContent: string = '';
  outputTitle: string = '';
  outputContent: string = '';

  @Output() postCreated = new EventEmitter
  
  constructor() {}

  ngOnInit(): void {}

  onClick(form: NgForm) {
    if(form.valid) {
      const post:any = {
        title: form.value.title,
        content: form.value.content        
      }      
      this.postCreated.emit(post)
    }    
  }
}
