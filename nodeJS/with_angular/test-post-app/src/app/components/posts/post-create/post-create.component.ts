import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  form!: FormGroup;
  mode: string = 'create';
  id!: string;
  post!: Post;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });

    this.activatedRoute.paramMap.subscribe((pm: ParamMap) => {
      if (pm.has('id')) {
        this.mode = 'edit';
        const postId = pm.get('id');
        if (postId !== null) {
          this.id = postId;
        }
        this.postService.getPost(this.id).subscribe((post) => {
          this.post = {
            _id: this.id,
            title: post.title,
            content: post.content,
          };

          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.mode === 'create') {
        this.postService.addPost(
          this.form.value.title,
          this.form.value.content
        );
      } else {
        this.postService.updatePost(
          this.id,
          this.form.value.title,
          this.form.value.content
        )
      }
    }
    this.form.reset();
  }
}
