import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost:String = ''
  enteredValue:String = ''
  constructor() { }

  ngOnInit(): void {
  }
  

  onClick(input: HTMLTextAreaElement) {
    this.newPost = input.value
  }

  onClickTwo() {
    this.newPost = this.enteredValue
  }
}
