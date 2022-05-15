import { Component, OnInit, EventEmitter, Output, ResolvedReflectiveFactory } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  form!:FormGroup
  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators:[Validators.required]}),
      content: new FormControl(null, {validators:[Validators.required, Validators.minLength(3)]}),
      image: new FormControl(null)
    })
  }
  
  onClick() {
    if (this.form.valid) {
      this.postService.setPost(this.form.value.title, this.form.value.content);
      this.form.reset();
    }
  }

  imgPreview!:string
  onAddImage(e:Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    this.form.patchValue({image: File})
    this.form.updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.imgPreview = reader.result as string
    }
    reader.readAsDataURL(file as Blob)
  }
}
