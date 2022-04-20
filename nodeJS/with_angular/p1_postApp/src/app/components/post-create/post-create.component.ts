import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
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
    console.dir(input)
    // this.newPost = input.value
  }

  onClickTwo() {
    this.newPost = this.enteredValue
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}
