import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  newPost: String = '';

  title: String = '';
  content: String = '';

  private mode = 'create';
  private id!: string | null;
  post!: Post;

  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        //additional param defined in the 'app-routing-module.ts'
        this.mode = 'edit';
        this.id = paramMap.get('id');
        // this.post = this.postService.getAPost(this.id);
        this.postService.getAPost(this.id).subscribe(data => {
          this.post = {_id:data._id, title:data.title, content:data.content}
        });
      } else {
        this.mode = 'create';
        this.id = '';
      }
    });
  }
  // using two way validate
  // onClick() {
  //   const post:Post = {
  //     title: this.title.toString(),
  //     content: this.content.toString()
  //   }

  //   this.postCreated.emit(post)
  // }

  // using form
  onSubmit(postForm: NgForm) {
    if (postForm.valid) {
      // const post:Post = {
      //   title: postForm.value.title,
      //   content: postForm.value.content
      // }
      // this.postCreated.emit(post)

      // using service
      if (this.mode === 'create') {
        this.postService.setPost(postForm.value.title, postForm.value.content);
      } else {
        this.postService.updatePost(
          postForm.value.id,
          postForm.value.title,
          postForm.value.content
        );
      }

      postForm.resetForm();
    } else {
      return;
    }
  }
}
