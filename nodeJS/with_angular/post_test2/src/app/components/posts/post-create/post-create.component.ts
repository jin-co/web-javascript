import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  output:String = ''

  title:String = ''
  content:String = ''
  newTitle:String =''
  newContent:String =''

  constructor() { }
  
  @Output() createdPost:any = new EventEmitter

  ngOnInit(): void {
  }

  onClick() {
    const post = {
      title: this.title,
      content: this.content
    }
    
    this.createdPost.emit(post)
  }
}
