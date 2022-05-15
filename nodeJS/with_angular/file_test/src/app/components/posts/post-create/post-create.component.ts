import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ResolvedReflectiveFactory,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  post!: Post;
  id!: string;

  constructor(
    public postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      image: new FormControl(null),
    });

    this.activatedRoute.paramMap.subscribe((pm: ParamMap) => {
      if (pm.has('id')) {
        this.mode = 'edit';
        let postId = pm.get('id');
        console.log(postId);
        if (postId !== null) {
          this.id = postId;
        }
        this.postService.getPost(this.id).subscribe((data) => {
          console.log(data);
          this.post = {
            _id: data._id,
            title: data.title,
            content: data.content,
            imagePath: '',
          };

          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: '',
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

  imgPreview!: string;
  onAddImage(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    this.form.patchValue({ image: File });
    this.form.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(file as Blob);
  }
}
