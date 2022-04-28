import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  inputTitle:String = ''
  inputContent:String = ''
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.inputTitle = 'h'
    this.inputContent = 'i'
  }

}