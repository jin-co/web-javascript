import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  inputTitle:string = ''
  inputContent:string = ''
  outputTitle:string = ''
  outputContent:string = ''
  @Output() createdPost = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  
  onClick() {
    const post = {
      title: this.inputTitle,
      content: this.inputContent
    }
    this.createdPost.emit(post)     
  }
}
