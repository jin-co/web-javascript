import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  inputTitle:string = ''
  inputContent:string = ''

  constructor() { }

  ngOnInit(): void {
  }

  onClick(title:HTMLTextAreaElement) {
    this.inputTitle = title.value
    this.inputContent = 'he'
  }
}