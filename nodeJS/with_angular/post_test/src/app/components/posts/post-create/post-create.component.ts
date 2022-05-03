import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  
  onSubmit() {
    const post = {
      title: this.inputTitle,
      content: this.inputContent  
    }        
    this.postCreated.emit(post)
  }
}
