import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  form!: FormGroup;
  mode: string = 'create';
  id: string = '';
  post!: Post;
  imgPreview!: string;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null)
    });

    this.activatedRoute.paramMap.subscribe((pm: ParamMap) => {
      if (pm.has('id')) {
        this.mode = 'edit';
        const postId = pm.get('id');
        if (postId !== null) {
          this.id = postId;
        }
        this.postService.getPost(this.id).subscribe((post) => {
          console.log('get post subs', post);
          this.post = post;

          this.form.setValue({
            title: this.post.title,
            content: this.post.content, 
            image: this.post.imagePath           
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
        this.postService.addPost(
          this.form.value.title,
          this.form.value.content,
          this.form.value.image
        );
      } else {
        this.postService.updatePost(
          this.id,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image
        );
      }
    }
    this.form.reset();
  }

  onImageAdd(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(file as Blob);    
  }
}