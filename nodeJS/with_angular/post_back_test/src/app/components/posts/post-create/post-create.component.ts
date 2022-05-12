import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';
import { mimeTypeValidator } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  mode: string = 'create';
  id: string = '';
  post!: Post;

  constructor(
    public postService: PostService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null),
    });

    this.activeRoute.paramMap.subscribe((pm: ParamMap) => {
      if (pm.has('id')) {
        this.mode = 'edit';
        let paramId = pm.get('id');
        if (paramId !== null) {
          this.id = paramId;
        }

        this.postService.getPost(this.id).subscribe((data) => {
          this.post = {
            _id: data._id,
            title: data.title,
            content: data.content,
            imagePath: ''
          };

          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: ''
          });
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  // onClick(form: NgForm) {
  //   if(form.valid) {
  //     if(this.mode === 'create') {
  //       this.postService.setPost(form.value.title, form.value.content)
  //     } else {
  //       console.log('front update', this.id)
  //       this.postService.updatePost(this.id, form.value.title, form.value.content)
  //     }
  //     form.resetForm()
  //   }
  // }

  form!: FormGroup;
  onClick() {
    if (this.form.valid) {
      if (this.mode === 'create') {
        this.postService.setPost(
          this.form.value.title,
          this.form.value.content,
          this.form.value.image
        );
      } else {
        console.log('front update', this.id);
        this.postService.updatePost(
          this.id,
          this.form.value.title,
          this.form.value.content
        );
      }
      this.form.reset();
    }
  }

  imgPreview!: string;
  onAddImage(e: Event) {
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
