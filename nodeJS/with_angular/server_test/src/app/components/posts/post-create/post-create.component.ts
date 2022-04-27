import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  inputText:String = ''
  inputContent:String = ''

  constructor() { }

  ngOnInit(): void {
  }
  
  onClick() {
    this.inputText = 'ha'
    this.inputContent = 'he'
  }
}
