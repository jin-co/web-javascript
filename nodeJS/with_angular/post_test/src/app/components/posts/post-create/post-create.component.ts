import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Modes } from 'src/enums/modes';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  id!:string
  mode:string = 'create'
  post!:Post

  constructor(public postService: PostService, public route:ActivatedRoute) {}

  ngOnInit(): void {

  }

  onClick(form: NgForm) {

  }
}
