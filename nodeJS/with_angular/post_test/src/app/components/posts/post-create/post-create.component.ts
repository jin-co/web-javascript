import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Modes } from 'src/enums/modes';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  id!:string
  mode:string = 'create'
  post!:Post

  constructor(public postService: PostService, public route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm:ParamMap) => {
      if(pm.has('id')) {
        this.mode = 'edit'
        let paramId = pm.get('id')
        if(paramId !== null) {
          this.id = paramId          
        }
        // this.post = this.postService.getPost(this.id)
        this.postService.getPost(this.id).subscribe((data) => {
          this.post = {
            _id: data._id,
            title: data.title,
            content: data.content
          }
        })
        console.log('this is getting param id', this.id, this.mode)
      } else {
        this.mode = 'create'
        this.id = ''
        console.log('this is without param id', this.id, this.mode)
      }
    })
  }

  onClick(form: NgForm) {
    if (form.valid) {
      if(this.mode === 'create') {
        console.log('this is create post')
        this.postService.setPost(form.value.title, form.value.content);
      } else {
        this.postService.updatePost(this.id, form.value.title, form.value.content);
      }      
      form.resetForm()
    }
  }
}
