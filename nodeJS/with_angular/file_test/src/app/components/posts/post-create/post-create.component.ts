import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

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
  constructor(public postService:PostService) { }

  ngOnInit(): void {
  }
  
  onClick() {    
    this.postService.setPost(this.inputTitle, this.inputContent)
  }
}
