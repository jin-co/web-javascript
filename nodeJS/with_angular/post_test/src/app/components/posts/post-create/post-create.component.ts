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

  constructor(
    public postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((pm: ParamMap) => {
      if (pm.has('id')) {
        this.mode = 'edit';
      } else {
        this.mode = 'create';
      }
    });
  }

  onClick(form: NgForm) {
    if (form.valid) {
      this.postService.setPosts(form.value.title, form.value.content);
    } else {
      return;
    }
  }
}
