import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Modes } from 'src/enums/modes';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.serviceA';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  id!: string;
  mode: string = 'create';
  post!:Post

  constructor(
    public postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((pm: ParamMap) => {
      if (pm.has('id')) {
        this.mode = 'edit';
        let postId = pm.get('id')
        console.log('***param id', postId)
        if (postId !== null) {
          this.id = postId
          console.log('***this id', this.id)
          this.postService.getPost(this.id).subscribe((data) => {
            this.post = {
              _id: data._id,
              title: data.title,
              content: data.content
            }
          })
          console.log('***post', this.post)
        }
      } else {
        this.mode = 'create';
      }
    });
  }

  onClick(form: NgForm) {
    if (form.valid) {
      if(this.mode === 'create') {
        this.postService.setPosts(form.value.title, form.value.content);
      } else {
        this.postService.updatePost(this.id, form.value.title, form.value.content);
      }
    } else {
      return;
    }
  }
}
