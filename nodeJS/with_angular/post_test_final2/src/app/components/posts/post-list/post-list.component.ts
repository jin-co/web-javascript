import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts:Post[] = []
  constructor() { }

  ngOnInit(): void {

  }
}
