import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  inputTitle:string = ''
  inputContent:string = ''
  outputTitle:string = ''
  outputContent:string = ''

  constructor() { }

  ngOnInit(): void {
  }
  
  onClick() {
    this.outputTitle = this.inputTitle
    this.outputContent = this.inputContent
  }
}
