import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: 'First', content: "1"},
  //   {title: 'second', content: "1"},
  //   {title: 'third', content: "1"},
  // ]

  @Input() posts:any = []
  constructor() { }

  ngOnInit(): void {
  }

}
