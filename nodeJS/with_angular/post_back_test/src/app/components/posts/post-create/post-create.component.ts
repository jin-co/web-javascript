import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  inputTitle: string = '';
  inputContent: string = '';
  outputTitle: string = '';
  outputContent: string = '';
  constructor() {}

  ngOnInit(): void {}

  onClick(form: NgForm) {
    if(form.valid) {
      this.outputTitle = form.value.title
      this.outputContent = form.value.content
    }    
  }
}
