import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  // title: String = '';
  // content: String = '';

  /***spinner */
  isLoading = false;
  /***spinner */

  private mode = 'create';
  private id!: string;
  post!: Post;

  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    // reactive validation
    this.rForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        let paramId = paramMap.get('id');
        if (paramId !== null) {
          this.id = paramId;
        }
        /***spinner */
        this.isLoading = true;
        /***spinner */
        this.postService.getAPost(this.id).subscribe((data) => {
          /***spinner */
          this.isLoading = false;
          /***spinner */
          this.post = {
            _id: data._id,
            title: data.title,
            content: data.content,
          };

          // initializing the form
          this.rForm.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.id = '';
      }
    });
    // reactive validation

    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('id')) {
    //     //additional param defined in the 'app-routing-module.ts'
    //     this.mode = 'edit';
    //     let paramId = paramMap.get('id');
    //     if (paramId !== null) {
    //       this.id = paramId;
    //     }
    //     /***spinner */
    //     this.isLoading = true;
    //     /***spinner */
    //     // this.post = this.postService.getAPost(this.id);
    //     this.postService.getAPost(this.id).subscribe((data) => {
    //       /***spinner */
    //       this.isLoading = false;
    //       /***spinner */
    //       this.post = {
    //         _id: data._id,
    //         title: data.title,
    //         content: data.content,
    //       };
    //     });
    //   } else {
    //     this.mode = 'create';
    //     this.id = '';
    //   }
    // });
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

      /***spinner */
      this.isLoading = true;
      /***spinner */

      // using service
      if (this.mode === 'create') {
        this.postService.setPost(postForm.value.title, postForm.value.content);
      } else {
        console.log('edit');
        this.postService.updatePost(
          this.id,
          postForm.value.title,
          postForm.value.content
        );
      }

      postForm.resetForm();
    } else {
      return;
    }
  }

  rForm!: FormGroup;
  get title() {
    return this.rForm.get('title');
  }
  get content() {
    return this.rForm.get('content');
  }
  onSubmitReactive() {
    if (this.rForm.valid) {
      /***spinner */
      this.isLoading = true;
      /***spinner */

      // using service
      if (this.mode === 'create') {
        this.postService.setPost(
          this.rForm.value.title,
          this.rForm.value.content
        );
      } else {
        console.log('edit');
        this.postService.updatePost(
          this.id,
          this.rForm.value.title,
          this.rForm.value.content
        );
      }

      this.rForm.reset();
    } else {
      return;
    }
  }

  onImagePick(e: Event) {
    const file = (e.target as HTMLInputElement).files;
    this.rForm.patchValue({ image: file });
    this.rForm.get('image')?.updateValueAndValidity();
    console.log('file picker', file)
  }
}
