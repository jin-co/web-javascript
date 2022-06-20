import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  inputTitle!: string;
  inputText!: string;
  outputTitle!: string;
  outputText!: string;
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.outputTitle = this.inputTitle;
    this.outputText = this.inputText;
  }
}
