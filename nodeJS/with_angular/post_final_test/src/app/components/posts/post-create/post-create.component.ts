import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/service/post.service';

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
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });

    this.activeRoute.paramMap.subscribe((pm: ParamMap) => {
      if (pm.has('id')) {
        const postId = pm.get('id');
        if (postId !== null) {
          this.id = postId;
        }
        this.mode = 'edit';

        this.postService.getPost(this.id).subscribe((post) => {
          console.log('found item: ', post);
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

  onClick() {
    if (this.form.valid) {
      if (this.mode === 'create') {
        this.postService.setPost(
          this.form.value.title,
          this.form.value.content
        );
      } else {
        this.postService.updatePost(
          this.id,
          this.form.value.title,
          this.form.value.content
        );
      }
    }
    this.form.reset();
  }
}
