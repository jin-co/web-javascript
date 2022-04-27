import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  @Output() postCreated = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  
  onClick() {
    const post:any = {
      title: this.inputTitle,
      content: this.inputContent
    }    
    this.postCreated.emit(post)    
  }
}
