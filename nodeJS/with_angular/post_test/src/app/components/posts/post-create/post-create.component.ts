import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  inputTitle = ''
  inputContent = ''
  outputTitle = ''
  outputContent = ''

  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.outputTitle = this.inputTitle
    this.outputContent = this.inputContent
  }
}
