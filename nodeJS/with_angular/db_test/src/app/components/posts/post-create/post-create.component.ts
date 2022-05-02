import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {  
  @Output() postCreated = new EventEmitter()
  constructor(public postService:PostService) { }

  ngOnInit(): void {
  }
  
  onClick(form:NgForm) {
    if(form.valid) {                  
      this.postService.setPost(
        form.value.title,
        form.value.content
      )
    } else {
      return
    }
  }
}