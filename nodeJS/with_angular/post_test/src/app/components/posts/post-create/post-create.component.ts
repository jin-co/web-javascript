import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  inputTitle = ''
  inputContent = ''

  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.inputTitle = 'hw'
    this.inputContent = 'h'
  }
}
